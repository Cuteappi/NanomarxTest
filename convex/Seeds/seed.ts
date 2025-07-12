import { internalMutation } from '../_generated/server';
import { internal } from '../_generated/api';
import { posts } from './posts';
import { users } from './users';
import { comments } from './comments';
import { tags } from './tags';

export const seedTags = internalMutation({
	handler: async (ctx) => {
		// Delete all existing tags
		const allTags = await ctx.db.query('tags').collect();
		await Promise.all(allTags.map(tag => ctx.db.delete(tag._id)));

		// Seed tags
		for (const tag of tags) {
			await ctx.db.insert('tags', {
				name: tag.name,
				description: tag.description,
				category: tag.category,
				isActive: tag.isActive,
				postCount: tag.postCount
			});
		}
	}
});

export const seedUsers = internalMutation({
	handler: async (ctx) => {
		// Delete all existing users
		const allUsers = await ctx.db.query('users').collect();
		await Promise.all(allUsers.map(user => ctx.db.delete(user._id)));

		for (const user of users) {
			await ctx.db.insert('users', user);
		}
	}
});


export const seedPosts = internalMutation({
	handler: async (ctx) => {
		// Delete all existing posts
		const allPosts = await ctx.db.query('posts').collect();
		await Promise.all(allPosts.map(post => ctx.db.delete(post._id)));

		// Reset post counts on all tags
		const allTags = await ctx.db.query('tags').collect();
		await Promise.all(allTags.map(tag => ctx.db.patch(tag._id, { postCount: 0 })));

		const tagNameToId = new Map(allTags.map(tag => [tag.name, tag._id]));

		for (const post of posts) {
			// Find the user ID for the post's author.
			const user = await ctx.db
				.query("users")
				.filter((q) => q.eq(q.field("name"), post.author))
				.first();

			if (!user) {
				console.warn(`User "${post.author}" not found, skipping post "${post.title}"`);
				continue;
			}

			// Map tag names to tag IDs
			const tagIds = post.tags
				.map(tagName => tagNameToId.get(tagName))
				.filter((id) => id !== undefined);

			// Do not insert the 'author' or 'tags' field, use 'userId' instead.
			const { author, submittedTime, tags, ...postData } = post;
			const subTime = new Date(post.submittedTime).getTime();
			const postId = await ctx.db.insert("posts", {
				...postData,
				userId: user._id,
				submittedTime: subTime,
			});

			// Create post-tag associations and update post count for each tag
			for (const tagId of tagIds) {
				if (tagId) {
					await ctx.db.insert("postTags", { postId, tagId });
					const tag = await ctx.db.get(tagId);
					if (tag) {
						await ctx.db.patch(tagId, { postCount: tag.postCount + 1 });
					}
				}
			}
		}
	}
});


export const seedComments = internalMutation({
	handler: async (ctx) => {
		// Delete all existing comments
		const allDbComments = await ctx.db.query('comments').collect();
		await Promise.all(allDbComments.map(comment => ctx.db.delete(comment._id)));

		const allPosts = await ctx.db.query('posts').collect();
		const allUsers = await ctx.db.query('users').collect();

		const postTitleToId = new Map(allPosts.map(p => [p.title, p._id]));
		const userNameToId = new Map(allUsers.map(u => [u.name, u._id]));

		const processComment = async (comment: any, postId: any, parentId: any = null) => {
			const userId = userNameToId.get(comment.author);
			if (!userId) {
				console.warn(`User "${comment.author}" not found for comment.`);
				return;
			}

			const subTime = new Date(comment.createdAt).getTime();

			const commentData: any = {
				postId,
				userId,
				content: comment.content,
				submittedTime: subTime,
				upvotes: Math.floor(Math.random() * 10),
			};

			if (parentId) {
				commentData.parentId = parentId;
			}

			const dbCommentId = await ctx.db.insert('comments', commentData);

			if (comment.replies && comment.replies.length > 0) {
				for (const reply of comment.replies) {
					await processComment(reply, postId, dbCommentId);
				}
			}
		};

		for (const postComments of comments) {
			const postId = postTitleToId.get(postComments.postTitle);
			if (!postId) {
				console.warn(`Post "${postComments.postTitle}" not found for comment.`);
				continue;
			}

			for (const comment of postComments.comments) {
				await processComment(comment, postId);
			}
		}
	}
});

export const all = internalMutation({
	handler: async (ctx) => {
		await ctx.runMutation(internal.Seeds.seed.seedTags);
		await ctx.runMutation(internal.Seeds.seed.seedUsers);
		await ctx.runMutation(internal.Seeds.seed.seedPosts);
		await ctx.runMutation(internal.Seeds.seed.seedComments);
	}
});
