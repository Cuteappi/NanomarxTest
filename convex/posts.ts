import { v } from "convex/values";
import { mutation, query, QueryCtx } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";
import { Doc } from "./_generated/dataModel";
import { getAuthUserId } from "@convex-dev/auth/server";

const addAuthorAndTagsToPosts = async (ctx: QueryCtx, posts: Doc<"posts">[]) => {
	const userId = await getAuthUserId(ctx);
	return await Promise.all(
		posts.map(async (post) => {
			const author = await ctx.db.get(post.userId);

			let isUpvotedByUser = false;
			if (userId) {
				const upvote = await ctx.db
					.query("userUpvotes")
					.withIndex("by_user_post", (q) =>
						q.eq("userId", userId).eq("postId", post._id)
					)
					.unique();
				isUpvotedByUser = !!upvote;
			}

			const postTags = await ctx.db
				.query("postTags")
				.withIndex("by_postId", q => q.eq("postId", post._id))
				.collect();

			const tags = await Promise.all(
				postTags.map(pt => ctx.db.get(pt.tagId))
			);

			return {
				...post,
				author: author?.name ?? "Unknown",
				isUpvotedByUser,
				tags: tags.filter(Boolean) as Doc<"tags">[],
			};
		})
	);
};

export const getRecent = query({
	args: { paginationOpts: paginationOptsValidator },
	handler: async (ctx, args) => {
		const result = await ctx.db
			.query("posts")
			.withIndex("by_submittedTime")
			.order("desc")
			.paginate(args.paginationOpts);

		const page = await addAuthorAndTagsToPosts(ctx, result.page);

		return {
			...result,
			page,
		};
	},
});

export const getActive = query({
	args: { paginationOpts: paginationOptsValidator },
	handler: async (ctx, args) => {
		const result = await ctx.db
			.query("posts")
			.withIndex("by_upvotes")
			.order("desc")
			.paginate(args.paginationOpts);

		const page = await addAuthorAndTagsToPosts(ctx, result.page);

		return {
			...result,
			page,
		};
	},
});

export const getById = query({
	args: { postId: v.id("posts") },
	handler: async (ctx, args) => {
		const post = await ctx.db.get(args.postId);
		if (!post) {
			return null;
		}

		const postWithDetails = await addAuthorAndTagsToPosts(ctx, [post]);

		return postWithDetails[0];
	},
});

export const getByTag = query({
	args: { tagId: v.id("tags") },
	handler: async (ctx, args) => {
		const postTags = await ctx.db
			.query("postTags")
			.withIndex("by_tagId", (q) => q.eq("tagId", args.tagId))
			.collect();

		const posts = await Promise.all(
			postTags.map(pt => ctx.db.get(pt.postId))
		);

		const filteredPosts = posts.filter(Boolean) as Doc<"posts">[];

		return await addAuthorAndTagsToPosts(ctx, filteredPosts);
	},
});

export const getPostsByCategory = query({
	args: { category: v.string() },
	handler: async (ctx, args) => {
		// Find all tags in the given category
		const tags = await ctx.db
			.query("tags")
			.withIndex("by_category", (q) => q.eq("category", args.category))
			.collect();

		const tagIds = new Set(tags.map(tag => tag._id));

		if (tagIds.size === 0) {
			return [];
		}

		// Fetch all post-tag relationships and filter them
		const allPostTags = await ctx.db.query("postTags").collect();
		const relevantPostTags = allPostTags.filter(pt => tagIds.has(pt.tagId));

		// Get unique post IDs
		const postIds = [...new Set(relevantPostTags.map(pt => pt.postId))];

		// Fetch the post documents
		const posts = (await Promise.all(
			postIds.map(postId => ctx.db.get(postId))
		)).filter(Boolean) as Doc<"posts">[];

		// Add author and tag details to the posts
		return await addAuthorAndTagsToPosts(ctx, posts);
	},
});

export const upvote = mutation({
	args: { postId: v.id("posts"), type: v.union(v.literal("add"), v.literal("remove")) },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error("Not authenticated");
		}
		const post = await ctx.db.get(args.postId);
		if (!post) {
			throw new Error("Post not found");
		}

		const existingUpvote = await ctx.db
			.query("userUpvotes")
			.withIndex("by_user_post", (q) =>
				q.eq("userId", userId).eq("postId", args.postId)
			)
			.unique();

		if (args.type === "add") {
			if (!existingUpvote) {
				await ctx.db.insert("userUpvotes", {
					userId,
					postId: args.postId,
				});
				await ctx.db.patch(args.postId, {
					upvotes: post.upvotes + 1,
				});
			}
		} else { // type is "remove"
			if (existingUpvote) {
				await ctx.db.delete(existingUpvote._id);
				await ctx.db.patch(args.postId, {
					upvotes: post.upvotes - 1,
				});
			}
		}
	},
});
