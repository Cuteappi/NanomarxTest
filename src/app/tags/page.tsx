"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";

export default function TagsPage() {
    const tags = useQuery(api.tags.getAll);

    const groupedTags = tags?.reduce((acc, tag) => {
        const { category } = tag;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(tag);
        return acc;
    }, {} as Record<string, typeof tags>);

    const sortedCategories = groupedTags ? Object.keys(groupedTags).sort() : [];

    return (
        <div className="container mx-auto p-4">
            <div className="text-lg font-semibold mb-6">Tags</div>
            <div className="space-y-8">
                {groupedTags && sortedCategories.map(category => {
                    const tagsInCategory = groupedTags[category];
                    return (
                        <div key={category}>
                            <h2 className="text-lg font-semibold mb-4 capitalize">{category}</h2>
                            <div className="flex flex-col space-y-2">
                                {tagsInCategory?.sort((a, b) => a.name.localeCompare(b.name)).map(tag => (
                                    <div key={tag._id} className="flex items-center space-x-2">
                                        <Link href={`/tags/${tag._id}`} className="tag-item-lg">
                                            <div className="tag-item-text-lg">{tag.name}</div>
                                        </Link>
                                        <p className="text-gray-400">{tag.description}</p>
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
