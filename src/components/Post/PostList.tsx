"use client";

import { usePaginatedQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import PostItem from "./PostItem";
import { useFilterStore } from "@/store/filterStore";
import { PostWithAuthor } from "./PostItem";
import PostListSkeleton from "./PostListSkeleton";

interface PostListProps {
    posts?: PostWithAuthor[];
    isLoading?: boolean;
}

export default function PostList({ posts: initialPosts, isLoading }: PostListProps) {
    const { sortBy } = useFilterStore();

    const query = sortBy === 'top' ? api.posts.getActive : api.posts.getRecent;

    const { results: fetchedPosts, status, loadMore } = usePaginatedQuery(
        query,
        {},
        { initialNumItems: 25 }
    );

    const posts = initialPosts || fetchedPosts;

    if (isLoading || (status === "LoadingFirstPage" && posts.length === 0)) {
        return <PostListSkeleton />;
    }

    if (posts.length === 0) {
        return <p className="text-center text-[#a0a0a0]">No posts found.</p>;
    }

    return (
        <div className="w-full max-w-4xl mx-auto px-4">
            <ul>
                {posts.map((post) => (
                    <PostItem key={post._id} post={post} />
                ))}
            </ul>
            {/* Pagination can be added here later */}
        </div>
    );
}
