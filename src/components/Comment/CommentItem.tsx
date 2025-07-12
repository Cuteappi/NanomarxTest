"use client";

import { MessageSquare, Minus, Plus, Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";
import { CommentWithChildren } from "@/utility/CommentTree";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import UpvoteButton from "../Buttons/UpvoteButton";
import CommentForm from "./CommentForm";
import Avatar from "../Avatar";
import Bracket from "../Icons/Bracket";
import CommentList from "./CommentList";
import CommentHeading from "./CommentHeading";
// A simplified timeSince function for comments


export default function CommentItem({ comment }: { comment: CommentWithChildren; }) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isReplying, setIsReplying] = useState(false);
    const { isAuthenticated } = useConvexAuth();
    const upvote = useMutation(api.comments.upvote);
    const deleteComment = useMutation(api.comments.deleteComment);
    const currentUser = useQuery(api.users.currentUser);
    const router = useRouter();

    useEffect(() => {
        if (!isCollapsed && contentRef.current && comment.content) {
            const sanitizedContent = DOMPurify.sanitize(comment.content);
            contentRef.current.innerHTML = sanitizedContent;
        }
    }, [comment.content, isCollapsed]);

    const handleUpvote = () => {
        if (!isAuthenticated) {
            router.push('/login');
            return;
        }
        upvote({ commentId: comment._id, type: comment.isUpvotedByUser ? "remove" : "add" });
    };

    const handleDelete = () => {
        if (currentUser && currentUser === comment.userId) {
            deleteComment({ commentId: comment._id });
        }
    };

    return (
        <div className="flex gap-1">
            <div className="w-7 flex-shrink-0 flex flex-col items-center gap-1">
                <button onClick={() => setIsCollapsed(!isCollapsed)} className="text-[#a0a0a0] hover:text-gray-200 focus:outline-none ">
                    {isCollapsed ?
                        <Bracket size={16}>
                            <Plus size={10} />
                        </Bracket> :
                        <Bracket size={16}>
                            <Minus size={10} />
                        </Bracket>}
                </button>
                {!isCollapsed ? (
                    <>
                        <UpvoteButton upvotes={comment.upvotes} handleUpvote={handleUpvote} isActive={comment.isUpvotedByUser} />
                        {comment.children?.length > 0 && (
                            <div className=" flex-grow w-[1.5px] bg-gray-800"></div>
                        )}
                    </>
                ) : <></>}
            </div>

            <div className="flex-1 group/item">
                <div className="text-sm user-display flex items-center justify-between">
                    <CommentHeading comment={comment} />

                    {/* Reply and delete buttons */}
                    <div className="flex items-center space-x-2 opacity-0 group-hover/item:opacity-100 transition-opacity">
                        <button onClick={() => setIsReplying(!isReplying)} className="text-gray-400 hover:text-white">
                            <MessageSquare size={14} />
                        </button>
                        {currentUser && currentUser === comment.userId && (
                            <button onClick={handleDelete} className="text-gray-400 hover:text-white">
                                <Trash size={14} />
                            </button>
                        )}
                    </div>


                </div>
                {!isCollapsed && (
                    <div className="mt-1">
                        <div ref={contentRef} className="text-md comment prose prose-invert" />
                        {isReplying && (
                            <div className="mt-2">
                                <CommentForm
                                    postId={comment.postId}
                                    parentId={comment._id}
                                    onCommentAdded={() => setIsReplying(false)}
                                />
                            </div>
                        )}
                        {comment.children?.length > 0 && (
                            <div className="mt-2">
                                <CommentList comments={comment.children} />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
