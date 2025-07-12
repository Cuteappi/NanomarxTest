const CategorySkeleton = () => (
    <div className="space-y-4">
        <div className="h-6 w-1/4 skelteon-bg animate-pulse rounded-sm"></div>
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <div className="h-5 w-24 skelteon-bg animate-pulse rounded-sm"></div>
                <div className="h-4 w-1/2 skelteon-bg animate-pulse rounded-sm"></div>
            </div>
            <div className="flex items-center gap-2">
                <div className="h-5 w-20 skelteon-bg animate-pulse rounded-sm"></div>
                <div className="h-4 w-2/3 skelteon-bg animate-pulse rounded-sm"></div>
            </div>
            <div className="flex items-center gap-2">
                <div className="h-5 w-28 skelteon-bg animate-pulse rounded-sm"></div>
                <div className="h-4 w-1/2 skelteon-bg animate-pulse rounded-sm"></div>
            </div>
        </div>
    </div>
);

export default function TagsPageSkeleton({ count = 10 }: { count?: number; }) {
    return (
        <div className="container mx-auto p-4" role="status">
            <div className="h-7 w-20 skelteon-bg animate-pulse mb-6 rounded-sm"></div>
            <div className="space-y-8">
                {Array.from({ length: count }).map((_, i) => (
                    <CategorySkeleton key={i} />
                ))}
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    );
}
