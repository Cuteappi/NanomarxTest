"use client";

import PostList from "@/components/Post/PostList";
import SubHeader from "@/components/Layout/SubHeader";

export default function Home() {
	return (
		<main className="max-w-4xl mx-auto">
			<SubHeader />
			<div>
				<PostList />
			</div>
		</main>
	);
}
