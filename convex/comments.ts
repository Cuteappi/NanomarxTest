import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { auth } from "./auth";
import { paginationOptsValidator } from "convex/server";
import { Doc } from "./_generated/dataModel";
import { getAuthUserId } from "@convex-dev/auth/server";

// Query to get all comments for a specific post
export const get = query({
    args: { postId: v.id("posts") },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx); // Can be null if not logged in

        const comments = await ctx.db
            .query("comments")
            .withIndex("by_post_and_time", (q) => q.eq("postId", args.postId))
            .order("desc")
            .collect();

        return Promise.all(
            comments.map(async (comment) => {
                const author = await ctx.db.get(comment.userId);

                let isUpvotedByUser = false;
                if (userId) {
                    const upvote = await ctx.db
                        .query("userUpvotes")
                        .withIndex("by_user_comment", (q) =>
                            q.eq("userId", userId).eq("commentId", comment._id)
                        )
                        .unique();
                    isUpvotedByUser = !!upvote;
                }

                return {
                    ...comment,
                    author: author?.name ?? "Unknown",
                    isUpvotedByUser, // Add the flag here
                };
            })
        );
    },
});

const addDetailsToComments = async (ctx: any, comments: Doc<"comments">[]) => {
    return await Promise.all(
        comments.map(async (comment) => {
            const author = await ctx.db.get(comment.userId);
            const post = await ctx.db.get(comment.postId);
            return {
                ...comment,
                author: author?.name ?? "Unknown",
                postTitle: post?.title ?? "Untitled Post",
                postAuthor: (await ctx.db.get(post!.userId))?.name ?? "Unknown",
            };
        })
    );
};

export const getRecent = query({
    args: { page: v.number(), perPage: v.number() },
    handler: async (ctx, args) => {
        const { page, perPage } = args;

        const allComments = await ctx.db
            .query("comments")
            .withIndex("by_submittedTime")
            .order("desc")
            .collect();

        const totalPages = Math.ceil(allComments.length / perPage);
        const start = (page - 1) * perPage;
        const end = start + perPage;

        const commentsForPage = allComments.slice(start, end);

        const pageWithDetails = await addDetailsToComments(ctx, commentsForPage);

        return {
            page: pageWithDetails,
            totalPages,
        };
    },
});

export const upvote = mutation({
    args: { commentId: v.id("comments"), type: v.union(v.literal("add"), v.literal("remove")) },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) {
            throw new Error("Not authenticated");
        }
        const comment = await ctx.db.get(args.commentId);
        if (!comment) {
            throw new Error("Comment not found");
        }

        const existingUpvote = await ctx.db
            .query("userUpvotes")
            .withIndex("by_user_comment", (q) =>
                q.eq("userId", userId).eq("commentId", args.commentId)
            )
            .unique();

        if (args.type === "add") {
            if (!existingUpvote) {
                await ctx.db.insert("userUpvotes", {
                    userId,
                    commentId: args.commentId,
                });
                await ctx.db.patch(args.commentId, {
                    upvotes: comment.upvotes + 1,
                });
            }
        } else { // type is "remove"
            if (existingUpvote) {
                await ctx.db.delete(existingUpvote._id);
                await ctx.db.patch(args.commentId, {
                    upvotes: comment.upvotes - 1,
                });
            }
        }
    },
});

// Mutation to add a new comment to a post
export const add = mutation({
    args: {
        postId: v.id("posts"),
        content: v.string(),
        parentId: v.optional(v.id("comments")),
    },
    handler: async (ctx, { postId, content, parentId }) => {
        const userId = await getAuthUserId(ctx);

        if (!userId) {
            throw new Error("Not authenticated");
        }

        await ctx.db.insert("comments", {
            postId,
            content,
            userId,
            parentId,
            upvotes: 1,
            submittedTime: Date.now(),
        });
    },
});

export const deleteComment = mutation({
    args: { commentId: v.id("comments") },
    handler: async (ctx, { commentId }) => {
        const userId = await getAuthUserId(ctx);

        if (!userId) {
            throw new Error("Not authenticated");
        }

        const comment = await ctx.db.get(commentId);

        if (!comment) {
            throw new Error("Comment not found");
        }

        if (comment.userId !== userId) {
            throw new Error("You are not authorized to delete this comment");
        }

        await ctx.db.delete(commentId);
    },
});
