"use client";

import { useState, FormEvent } from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/../convex/_generated/api';
import PostItem from '@/components/Post/PostItem';
import CommentItem from '@/components/Comment/CommentItem';
import PostListSkeleton from '@/components/Post/PostListSkeleton';
import CommentLoadingSkeleton from '@/components/Comment/CommentLoadingSkeleton';

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [searchType, setSearchType] = useState<'stories' | 'comments'>('stories');
    const [orderBy, setOrderBy] = useState<'newest' | 'relevance' | 'score'>('newest');

    const [submittedParams, setSubmittedParams] = useState<{ query: string; type: 'stories' | 'comments'; orderBy: 'newest' | 'relevance' | 'score'; } | null>(null);

    const results = useQuery(
        api.search.search,
        submittedParams ? { query: submittedParams.query, type: submittedParams.type, orderBy: submittedParams.orderBy } : "skip"
    );

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setSubmittedParams({ query, type: searchType, orderBy });
    };

    const Hint = ({ children }: { children: React.ReactNode; }) => (
        <code className="bg-[#1e1e1e] text-gray-300 font-mono text-sm">{children}</code>
    );

    return (
        <div className="max-w-lg pt-2 pl-10 text-gray-300">
            <h1 className="text-lg font-semibold text-[#DFDFDF] mb-10">Search</h1>

            <form onSubmit={handleSubmit}>
                {/* Search Input */}
                <div className="flex mb-4 gap-2">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="max-w-80 search-form-textarea"
                    />
                    <button type="submit" className="px-4 py-1 comment-form-button text-md">
                        Search
                    </button>
                </div>

                {/* Search Type and Order By */}
                <div className="space-y-4 mb-8 text-sm">
                    <div className="flex gap-4">
                        <span className="text-md font-semibold text-[#dfdfdf]">Search:</span>
                        <div className="flex gap-4">
                            <label className="flex text-md items-center gap-1.5">
                                <input
                                    type="radio"
                                    name="searchType"
                                    value="stories"
                                    checked={searchType === 'stories'}
                                    onChange={() => setSearchType('stories')}
                                    className="accent-teal-400"
                                />
                                Stories
                            </label>
                            <label className="flex text-md items-center gap-1.5">
                                <input
                                    type="radio"
                                    name="searchType"
                                    value="comments"
                                    checked={searchType === 'comments'}
                                    onChange={() => setSearchType('comments')}
                                    className="accent-teal-400"
                                />
                                Comments
                            </label>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <span className="text-md font-semibold text-[#dfdfdf]">Order By:</span>
                        <div className="flex gap-4">
                            <label className="flex text-md items-center gap-1.5">
                                <input
                                    type="radio"
                                    name="orderBy"
                                    value="newest"
                                    checked={orderBy === 'newest'}
                                    onChange={() => setOrderBy('newest')}
                                    className="accent-teal-400"
                                />
                                Newest
                            </label>
                            <label className="flex text-md items-center gap-1.5">
                                <input
                                    type="radio"
                                    name="orderBy"
                                    value="relevance"
                                    checked={orderBy === 'relevance'}
                                    onChange={() => setOrderBy('relevance')}
                                    className="accent-teal-400"
                                />
                                Relevance
                            </label>
                            <label className="flex items-center gap-1.5">
                                <input
                                    type="radio"
                                    name="orderBy"
                                    value="score"
                                    checked={orderBy === 'score'}
                                    onChange={() => setOrderBy('score')}
                                    className="accent-teal-400"
                                />
                                Score
                            </label>
                        </div>
                    </div>
                </div>

                {/* Search Hints */}
                {/*add search hints feature that can parse the seach data and return accordingly*/}
                {/* <div>
                    <h2 className="text-white mb-2">Search hints:</h2>
                    <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-300">
                        <li>Search terms are required. Use quote marks if you want <Hint>"words together"</Hint></li>
                        <li>Terms are exact, so <Hint>code</Hint> doesn't match <Hint>coder</Hint> or <Hint>coding</Hint>. You can approximate stemming with <Hint>cod*</Hint></li>
                        <li>Search titles with <Hint>title:kernel</Hint> or <Hint>title:"linux kernel"</Hint></li>
                        <li>Search by domain with <Hint>domain:example.com</Hint></li>
                        <li>Search by story submitter with <Hint>submitter:alice</Hint> or by comment author with <Hint>commenter:bob</Hint></li>
                        <li>Search by <Hint>tag</Hint> with <Hint>tag:meta</Hint></li>
                    </ul>
                </div> */}
            </form>

            <div className="mt-8">
                {results === undefined && submittedParams && (
                    submittedParams.type === 'stories' ? <PostListSkeleton count={3} /> : <CommentLoadingSkeleton count={3} />
                )}
                {results?.length === 0 && <p className="text-center text-[#a0a0a0]">No results found.</p>}
                {results && results.length > 0 && (
                    <div className="space-y-4">
                        {submittedParams?.type === 'stories' ? (
                            results.map((post: any) => <PostItem key={post._id} post={post} />)
                        ) : (
                            results.map((comment: any) => <CommentItem key={comment._id} comment={comment} />)
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
