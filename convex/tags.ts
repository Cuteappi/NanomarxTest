import { query } from "./_generated/server";
import { v } from "convex/values";


export const getAll = query({
    handler: async (ctx) => {
        return await ctx.db.query("tags").order("desc").collect();
    },
});

export const getById = query({
    args: { tagId: v.id("tags") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.tagId);
    },
});
