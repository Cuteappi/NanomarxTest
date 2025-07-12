import { v } from "convex/values";
import { query } from "./_generated/server";
import { Doc } from "./_generated/dataModel";

export const search = query({
    args: {
        query: v.string(),
        type: v.union(v.literal("stories"), v.literal("comments")),
        orderBy: v.union(v.literal("relevance"), v.literal("newest"), v.literal("score")),
    },
    async handler(ctx, args) {
        if (args.type === "stories") {
            const posts = await (async () => {
                if (args.query) {
                    return ctx.db.query("posts").withSearchIndex("search_title", (q) => q.search("title", args.query)).collect();
                } else {
                    if (args.orderBy === "score") {
                        return ctx.db.query("posts").withIndex("by_upvotes").order("desc").collect();
                    } else {
                        return ctx.db.query("posts").withIndex("by_submittedTime").order("desc").collect();
                    }
                }
            })();

            return Promise.all(
                posts.map(async (post: Doc<"posts">) => {
                    const user = await ctx.db.get(post.userId);
                    const postTags = await ctx.db.query("postTags").withIndex("by_postId", (q) => q.eq("postId", post._id)).collect();
                    const tags = await Promise.all(postTags.map(async (pt) => ctx.db.get(pt.tagId)));
                    return {
                        ...post,
                        author: user?.name ?? "Anonymous",
                        tags: tags.filter(Boolean).map(tag => ({ _id: tag!._id, name: tag!.name }))
                    };
                })
            );
        }

        if (args.type === "comments") {
            const comments = await (async () => {
                if (args.query) {
                    return ctx.db.query("comments").withSearchIndex("search_content", (q) => q.search("content", args.query)).collect();
                } else {
                    if (args.orderBy === "score") {
                        return ctx.db.query("comments").withIndex("by_upvotes").order("desc").collect();
                    } else {
                        return ctx.db.query("comments").withIndex("by_submittedTime").order("desc").collect();
                    }
                }
            })();

            return Promise.all(
                comments.map(async (comment: Doc<"comments">) => {
                    const user = await ctx.db.get(comment.userId);
                    const post = await ctx.db.get(comment.postId);
                    return {
                        ...comment,
                        author: user?.name ?? "Anonymous",
                        postTitle: post?.title ?? "",
                        postId: post?._id ?? "",
                    };
                })
            );
        }

        return [];
    },
});
