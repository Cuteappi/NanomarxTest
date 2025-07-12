const SkeletonElement = () => (
    <div className="flex gap-2 p-2">
        <div className="w-7 flex-shrink-0 flex flex-col items-center gap-2">
            <div className="w-5 h-5 skelteon-bg animate-pulse"></div>
            <div className="w-px h-full bg-gray-800"></div>
        </div>
        <div className="flex-1 group/item space-y-3 py-1">
            <div className="flex items-center gap-2">
                <div className="h-4 skelteon-bg w-1/4 animate-pulse"></div>
            </div>
            <div className="space-y-2">
                <div className="h-4 skelteon-bg w-5/6 animate-pulse"></div>
                <div className="h-4 skelteon-bg w-full animate-pulse"></div>
                <div className="h-4 skelteon-bg w-3/4 animate-pulse"></div>
            </div>
        </div>
    </div>
);

export default function CommentLoadingSkeleton({ count = 3 }: { count?: number; }) {
    return (
        <div className="mt-4 space-y-4" role="status">
            {Array.from({ length: count }).map((_, i) => (
                <SkeletonElement key={i} />
            ))}
            <span className="sr-only">Loading...</span>
        </div>
    );
}
