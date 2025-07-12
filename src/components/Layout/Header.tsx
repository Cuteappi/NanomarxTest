"use client";

import { useFilterStore } from '@/store/filterStore';
import { useConvexAuth, useQuery } from 'convex/react';
import { api } from '@/../convex/_generated/api';
import Link from 'next/link';
import { useAuthActions } from '@convex-dev/auth/react';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { getLinkClasses } from '@/utility/ActiveClassHelper';

export default function Header() {
	const { filter, setFilter } = useFilterStore();
	const { isAuthenticated, isLoading } = useConvexAuth();
	const currentUser = useQuery(api.users.currentUser, isAuthenticated ? {} : "skip");
	const { signOut } = useAuthActions();
	const pathname = usePathname();



	return (
		<header className="px-4 py-4.5">
			<div className="flex justify-between items-center">
				<nav className="flex items-center gap-2.5">
					<a href="/" className="bg-[#600000] w-4.5 h-4.5 flex items-center justify-center text-white font-serif text-lg">L</a>
					<Link href="/" onClick={() => setFilter('active')}
						className={getLinkClasses('active', { pathname, filter })}
					>
						Active
					</Link>
					<Link href="/" onClick={() => setFilter('recent')}
						className={getLinkClasses('recent', { pathname, filter })}
					>
						Recent
					</Link>
					<Link href="/comments" className={getLinkClasses('comments', { pathname })}>Comments</Link>
					<Link href="/search" className={getLinkClasses('search', { pathname })}>Search</Link>
				</nav>
				<div className="flex items-center space-x-4">
					{!isLoading && (
						<>
							{isAuthenticated && currentUser ? (
								<div className="flex items-center space-x-4">
									<button onClick={() => void signOut()} className={getLinkClasses('login', { pathname })}>
										Log Out
									</button>
								</div>
							) : (
								<Link href="/login" className={getLinkClasses('login', { pathname })}>
									Log In
								</Link>
							)}
						</>
					)}
				</div>
			</div >
		</header >
	);
}
