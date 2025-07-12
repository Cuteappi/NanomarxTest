"use client";

import { use } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import PostItem from "@/components/Post/PostItem";

export default function TagPage({ params: paramsPromise }: { params: Promise<{ tagId: Id<"tags">; }>; }) {
    const params = use(paramsPromise);
    const posts = useQuery(api.posts.getByTag, { tagId: params.tagId });
    const tagName = useQuery(api.tags.getById, { tagId: params.tagId });

    return (
        <div className="container mx-auto p-4">
            <div className="text-lg font-semibold mb-3 pl-7.5 text-[#a0a0a0]">Posts for Tag {tagName?.name}</div>
            <ul>
                {posts?.map(post => (
                    <PostItem key={post._id} post={post} />
                ))}
            </ul>
        </div>
    );
}
