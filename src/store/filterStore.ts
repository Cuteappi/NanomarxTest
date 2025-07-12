import { create } from 'zustand';

type SortByType = 'newest' | 'top';

type FilterState = {
	filter: 'active' | 'recent';
	setFilter: (filter: 'active' | 'recent') => void;
	sortBy: SortByType;
	setSortBy: (sortBy: SortByType) => void;
};

export const useFilterStore = create<FilterState>((set) => ({
	filter: 'active', // Default filter
	setFilter: (filter) => set({ filter }),
	sortBy: 'newest', // Default sort
	setSortBy: (sortBy) => set({ sortBy }),
}));
