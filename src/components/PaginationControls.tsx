"use client";

import { useRouter, useSearchParams } from 'next/navigation';

export default function PaginationControls({ hasNextPage, hasPrevPage }: { hasNextPage: boolean; hasPrevPage: boolean; }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const page = searchParams.get('page') ?? '1';
    const per_page = searchParams.get('per_page') ?? '25';

    const handlePrev = () => {
        router.push(`/comments?page=${Number(page) - 1}&per_page=${per_page}`);
    };

    const handleNext = () => {
        router.push(`/comments?page=${Number(page) + 1}&per_page=${per_page}`);
    };

    return (
        <div className="flex justify-center items-center space-x-4 my-6 text-gray-400">
            <button
                className="hover:text-white disabled:text-gray-600 disabled:cursor-not-allowed"
                disabled={!hasPrevPage}
                onClick={handlePrev}>
                &lt;&lt; Page {Number(page) - 1}
            </button>
            <span>|</span>
            <button
                className="hover:text-white disabled:text-gray-600 disabled:cursor-not-allowed"
                disabled={!hasNextPage}
                onClick={handleNext}>
                Page {Number(page) + 1} &gt;&gt;
            </button>
        </div>
    );
}
