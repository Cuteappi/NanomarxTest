"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import LatestCommentItem from "../../components/Comment/LatestCommentItem";
import PaginationControls from "../../components/PaginationControls";
import { useSearchParams } from 'next/navigation';

export default function CommentsPage() {
    const searchParams = useSearchParams();
    const page = Number(searchParams.get('page') ?? '1');
    const perPage = Number(searchParams.get('per_page') ?? '25');

    const commentsData = useQuery(
        api.comments.getRecent,
        { page, perPage }
    );

    if (!commentsData) {
        return <div className="text-center text-gray-400">Loading...</div>;
    }

    const { page: comments, totalPages } = commentsData;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold text-white mb-4">Newest Comments</h1>
            <ul className="space-y-2">
                {
                    comments.map((comment) => (
                        <LatestCommentItem key={comment._id} comment={comment as any} />
                    ))
                }
            </ul >
            <PaginationControls
                hasNextPage={page < totalPages}
                hasPrevPage={page > 1}
            />
        </div >
    );
}
