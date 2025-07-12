"use client";

import { useConvexAuth } from 'convex/react';
import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@/../convex/_generated/api';
import { Id } from '@/../convex/_generated/dataModel';

interface CommentFormProps {
    postId: Id<"posts">;
    parentId?: Id<"comments">;
    onCommentAdded?: () => void;
}

export default function CommentForm({ postId, parentId, onCommentAdded }: CommentFormProps) {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const [commentText, setCommentText] = useState('');
    const addComment = useMutation(api.comments.add);

    const handlePostComment = async () => {
        if (!commentText.trim()) return;
        await addComment({ postId, content: commentText, parentId });
        setCommentText('');
        onCommentAdded?.();
    };

    return (
        <div className="p-4">
            <div className="comment-form-container">
                <textarea
                    className="comment-form-textarea w-3xl"
                    rows={4}
                    placeholder={!isAuthenticated ? "You must be logged in to leave a comment." : "Leave a comment..."}
                    disabled={!isAuthenticated || isLoading}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                />
            </div>
            <div className="flex justify-start space-x-2 mt-2">
                <button
                    className="px-4 py-1 comment-form-button text-md"
                    disabled={!isAuthenticated || isLoading || !commentText.trim()}
                    onClick={handlePostComment}
                >
                    Post
                </button>
                {/* <button
                    className="px-4 py-1 bg-transparent border border-gray-600 text-gray-300 font-semibold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!isAuthenticated || isLoading}
                >
                    Preview
                </button> */}
            </div>
        </div>
    );
}
