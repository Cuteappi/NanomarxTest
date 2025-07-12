"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useParams } from "next/navigation";
import PostList from "../../../../components/Post/PostList";
import PostListSkeleton from "../../../../components/Post/PostListSkeleton";

export default function CategoryPage() {
    const params = useParams();
    const categoryName = params.categoryName as string;

    const posts = useQuery(api.posts.getPostsByCategory, { category: categoryName });

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-lg text-[#a0a0a0] pl-7.5 font-semibold mb-4 capitalize">Posts in {categoryName}</h1>
            <div className="space-y-4">
                {posts === undefined ? (
                    <PostListSkeleton />
                ) : posts.length === 0 ? (
                    <p className="text-center text-[#a0a0a0]">No posts found in this category.</p>
                ) : (
                    <PostList posts={posts} />
                )}
            </div>
        </div>
    );
}
