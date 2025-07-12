import { Triangle } from "lucide-react";
import { useEffect } from "react";

export default function UpvoteButton({ upvotes, handleUpvote, isActive }: { upvotes: number; handleUpvote: () => void; isActive: boolean; }) {
    const activeClasses = "fill-[#cf3631] stroke-[#cf3631]";
    const inactiveClasses = "group-hover/upvote:fill-[#cf3631] group-hover/upvote:stroke-[#cf3631]";
    return (
        <div className="flex flex-col items-center flex-shrink text-gray-400 pt-0.5 gap-1 min-w-8">
            <button aria-label='upvote' className="text-lg group/upvote" onClick={handleUpvote}>
                <Triangle size={16} className={`transition-colors ${isActive ? activeClasses : inactiveClasses}`} />
            </button>
            <div className="text-[8pt] text-end">{upvotes}</div>
        </div>
    );
}