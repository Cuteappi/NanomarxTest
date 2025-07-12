import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	...authTables,

	posts: defineTable({
		title: v.string(),
		url: v.string(),
		domain: v.string(),
		upvotes: v.number(),
		userId: v.id("users"),
		submittedTime: v.number(),
		commentCount: v.number(),
	})
		.index("by_upvotes", ["upvotes"])
		.index("by_submittedTime", ["submittedTime"])
		.searchIndex("search_title", {
			searchField: "title",
		}),

	postTags: defineTable({
		postId: v.id("posts"),
		tagId: v.id("tags"),
	})
		.index("by_postId", ["postId"])
		.index("by_tagId", ["tagId"])
		.index("by_post_tag", ["postId", "tagId"]),

	tags: defineTable({
		name: v.string(),
		description: v.string(),
		isActive: v.boolean(),
		postCount: v.number(),
		category: v.string(),
	})
		.index("by_name", ["name"]),

	comments: defineTable({
		userId: v.id("users"),
		postId: v.id("posts"),
		parentId: v.optional(v.id("comments")),
		content: v.string(),
		submittedTime: v.number(),
		upvotes: v.number(),
	})
		.index("by_post", ["postId"])
		.index("by_upvotes", ["upvotes"])
		.index("by_submittedTime", ["submittedTime"])
		.index("by_post_and_time", ["postId", "submittedTime"])
		.searchIndex("search_content", {
			searchField: "content",
		}),

	userUpvotes: defineTable({
		userId: v.id("users"),
		postId: v.optional(v.id("posts")),
		commentId: v.optional(v.id("comments")),
	})
		.index("by_user_post", ["userId", "postId"])
		.index("by_user_comment", ["userId", "commentId"]),
});
