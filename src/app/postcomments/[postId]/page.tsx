"use client";

import { useConvexAuth, useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Id } from "@/../convex/_generated/dataModel";
import PostItem from "@/components/Post/PostItem";
import CommentList from "@/components/Comment/CommentList";
import CommentForm from "@/components/Comment/CommentForm";
import { use } from "react";

export default function PostPage({ params }: { params: Promise<{ postId: Id<"posts">; }>; }) {
  const { postId } = use(params);
  const { isAuthenticated, isLoading } = useConvexAuth();
  const post = useQuery(api.posts.getById, { postId });

  if (post === undefined) {
    return <div>Loading...</div>;
  }

  if (post === null) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <PostItem post={post} />
      <div className="mt-3">
        <CommentForm postId={post._id} />
        <CommentList postId={post._id} />
      </div>
    </div>
  );
}
