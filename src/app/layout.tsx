import type { Metadata } from "next";

import "./globals.css";
import { ConvexClientProvider } from "@/app/ConvexClientProvider";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

export const metadata: Metadata = {
	title: "Nanomarx",
	description: "A modern discussion platform built with Next.js and Convex.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ConvexAuthNextjsServerProvider>
			<html lang="en">
				<body className="max-w-4xl mx-auto">
					<ConvexClientProvider>
						<Header />
						{children}
						<Footer />
					</ConvexClientProvider>
				</body>
			</html>
		</ConvexAuthNextjsServerProvider>
	);
}
