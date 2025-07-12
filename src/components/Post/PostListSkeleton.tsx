const PostSkeleton = () => (
    <li className="flex py-1 gap-0.5">
        <div className="w-7 flex-shrink-0 flex flex-col items-center gap-1 pt-1">
            <div className="w-4 h-4 skelteon-bg animate-pulse rounded-sm"></div>
        </div>
        <div className="flex-1 group/item space-y-2 py-1">
            <div className="flex items-center gap-2">
                <div className="h-5 skelteon-bg w-3/4 animate-pulse rounded-sm"></div>
                <div className="h-3 skelteon-bg w-1/4 animate-pulse rounded-sm"></div>
            </div>
            <div className="flex items-center gap-2">
                <div className="h-3 skelteon-bg w-1/6 animate-pulse rounded-sm"></div>
                <div className="h-3 skelteon-bg w-1/6 animate-pulse rounded-sm"></div>
            </div>
        </div>
    </li>
);

export default function PostListSkeleton({ count = 25 }: { count?: number; }) {
    return (
        <div className="w-full max-w-4xl mx-auto px-4" role="status">
            <ul>
                {Array.from({ length: count }).map((_, i) => (
                    <PostSkeleton key={i} />
                ))}
            </ul>
            <span className="sr-only">Loading...</span>
        </div>
    );
}
