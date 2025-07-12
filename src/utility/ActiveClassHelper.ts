type LinkType = 'active' | 'recent' | 'comments' | 'login' | 'search' | 'newest' | 'top';

interface LinkState {
    pathname: string;
    filter?: string;
    sortBy?: string;
}

export const getLinkClasses = (linkType: LinkType, state: LinkState): string => {
    const baseClasses = "text-md font-semibold text-center text-[#a8a8a8]";
    const { pathname, filter, sortBy } = state;

    // Handle path-based links first
    const pathMap: { [key: string]: string; } = {
        comments: '/comments',
        login: '/login',
        search: '/search',
    };

    if (linkType in pathMap) {
        const activeClasses = "active-link-indicator";
        return `${baseClasses} ${pathname === pathMap[linkType] ? activeClasses : ""}`;
    }

    // Handle filter-based links (only on homepage)
    if (linkType === 'active' || linkType === 'recent') {
        const activeClasses = "active-link-indicator";
        if (pathname !== '/') return baseClasses;
        return `${baseClasses} ${filter === linkType ? activeClasses : ""}`;
    }

    // Handle sort-based links
    if (linkType === 'newest' || linkType === 'top') {
        const activeClasses = "active-link-indicator"; // Note: No 'text-white' as per original
        return `${baseClasses} ${sortBy === linkType ? activeClasses : ''}`;
    }

    return baseClasses;
};