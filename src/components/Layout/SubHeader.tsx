"use client";

import { useFilterStore } from "@/store/filterStore";
import { usePathname } from "next/navigation";
import { getLinkClasses } from "@/utility/ActiveClassHelper";

export default function SubHeader() {
    const { sortBy, setSortBy, filter } = useFilterStore();
    const pathname = usePathname();

    return (
        <div className="w-full px-4">
            <div className="flex justify-end items-center my-4">
                <div className="text-md flex gap-2.5 ">
                    <button onClick={() => setSortBy('newest')} className={getLinkClasses('newest', { pathname, sortBy })}>Newest</button>
                    <button onClick={() => setSortBy('top')} className={getLinkClasses('top', { pathname, sortBy })}>Top</button>
                </div>
            </div>
            <p className="text-md text-gray-400 pb-5 italic pl-7.5">
                {filter === 'active'
                    ? (sortBy === 'top' ? 'Top active stories.' : 'Active discussions.')
                    : (sortBy === 'top' ? 'Top recent stories.' : 'Recent stories.')}
            </p>
        </div>
    );
}
