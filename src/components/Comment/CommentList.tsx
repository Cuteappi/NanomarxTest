"use client";

import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Id } from "@/../convex/_generated/dataModel";
import CommentItem from "./CommentItem";
import { CommentWithChildren, buildCommentTree } from "@/utility/CommentTree";
import CommentLoadingSkeleton from "./CommentLoadingSkeleton";


export default function CommentList({ postId, comments: propComments }: { postId?: Id<"posts">, comments?: CommentWithChildren[]; }) {
    const fetchedComments = useQuery(api.comments.get, postId ? { postId } : "skip");


    //for nesting comments
    if (propComments) {
        return (
            <div className="mt-4 space-y-4">
                {propComments.map((comment) => (
                    <CommentItem key={comment._id} comment={comment} />
                ))}
            </div>
        );
    }

    if (fetchedComments === undefined) {
        return <CommentLoadingSkeleton />;
    }

    if (fetchedComments.length === 0) {
        return <p className="text-center text-[#a0a0a0]">Be the first to comment.</p>;
    }

    const commentTree = buildCommentTree(fetchedComments);

    return (
        <div className="flex flex-col gap-4 max-w-4xl mx-auto">
            {commentTree.map((comment) => (
                <CommentItem key={comment._id} comment={comment} />
            ))}
        </div>
    );
}
