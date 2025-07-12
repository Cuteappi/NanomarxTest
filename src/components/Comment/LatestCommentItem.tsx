"use client";

import { Doc } from "../../../convex/_generated/dataModel";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import DOMPurify from "dompurify";
import UpvoteButton from "../Buttons/UpvoteButton";
import { useConvexAuth, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import CommentHeading from "./CommentHeading";
import Bracket from "../Icons/Bracket";
import { Plus, Minus } from "lucide-react";
// Define the type for the comment object with author and post details
export type CommentWithDetails = Doc<"comments"> & {
    author: string;
    postTitle: string;
};

export default function LatestCommentItem({ comment }: { comment: CommentWithDetails; }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isUpvoted, setIsUpvoted] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const { isAuthenticated } = useConvexAuth();
    const upvote = useMutation(api.comments.upvote);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined' && !isCollapsed && contentRef.current && comment.content) {
            const sanitizedContent = DOMPurify.sanitize(comment.content);
            contentRef.current.innerHTML = sanitizedContent;
        }
    }, [comment.content, isCollapsed]);

    const handleUpvote = () => {
        if (!isAuthenticated) {
            router.push('/login');
            return;
        }
        setIsUpvoted(!isUpvoted);
        upvote({ commentId: comment._id, type: !isUpvoted ? "add" : "remove" });
    };

    return (
        <li className="relative flex gap-1 py-1.5">
            <div className="w-7 flex-shrink-0 flex flex-col items-center gap-1">
                <button onClick={() => setIsCollapsed(!isCollapsed)} className="text-gray-400 hover:text-white focus:outline-none text-[10pt]">
                    {isCollapsed ?
                        <Bracket size={16}>
                            <Plus size={10} />
                        </Bracket> :
                        <Bracket size={16}>
                            <Minus size={10} />
                        </Bracket>}
                </button>
                {!isCollapsed && (
                    <UpvoteButton upvotes={comment.upvotes + (isUpvoted ? 1 : 0)} handleUpvote={handleUpvote} isActive={isUpvoted} />
                )}
            </div>

            <div className="flex-1 items-end">
                <div className="text-sm user-display flex items-center gap-1.5">
                    <CommentHeading comment={comment} />
                    <div className="flex items-center gap-0.5">
                        <span className="text-sm user-display">on:</span>
                        <Link href={`/postcomments/${comment.postId}`} className="hover:underline truncate">
                            {comment.postTitle}
                        </Link>
                    </div>
                </div>
                {!isCollapsed && (
                    <div className="mt-1">
                        <div ref={contentRef} className="text-md comment prose prose-invert" />
                    </div>
                )}
            </div>
        </li>
    );
}
