"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";
import TagsPageSkeleton from "../../components/Tag/TagsPageSkeleton";

export default function TagsPage() {
    const tags = useQuery(api.tags.getAll);

    if (tags === undefined) {
        return <TagsPageSkeleton />;
    }

    const groupedTags = tags?.reduce((acc, tag) => {
        const category = tag.category || 'general';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(tag);
        return acc;
    }, {} as Record<string, typeof tags>);

    const sortedCategories = groupedTags ? Object.keys(groupedTags).sort() : [];

    return (
        <div className="container mx-auto p-4">
            <div className="text-xl font-semibold mb-6 text-[#a0a0a0]">Tags</div>
            <div className="space-y-8">
                {groupedTags && sortedCategories.map(category => {
                    const tagsInCategory = groupedTags[category];
                    return (
                        <div key={category}>
                            <Link href={`/tags/category/${category}`}>
                                <h2
                                    className="text-lg font-bold underline capitalize pb-3 hover:cursor-pointer"
                                    style={{ color: 'var(--link-blue)' }}
                                >
                                    {category}
                                </h2>
                            </Link>
                            <div className="flex flex-col gap-0.5">
                                {tagsInCategory?.sort((a, b) => a.name.localeCompare(b.name)).map(tag => (
                                    <div key={tag._id} className="flex items-center gap-0.75">
                                        <Link href={`/tags/${tag._id}`} className="tag-item">
                                            <div className="tag-item-text">{tag.name}</div>
                                        </Link>
                                        <p className="text-[#e5e4df] text-md">{tag.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
