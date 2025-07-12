"use client";

import { usePaginatedQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import PostItem from "./PostItem";
import { useFilterStore } from "@/store/filterStore";

export default function PostList() {
	const { sortBy } = useFilterStore();

	const query = sortBy === 'top' ? api.posts.getActive : api.posts.getRecent;

	const { results: posts, status, loadMore } = usePaginatedQuery(
		query,
		{},
		{ initialNumItems: 25 }
	);

	if (status === "LoadingFirstPage" && posts.length === 0) {
		return <div className="text-center p-4">Loading...</div>;
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
