import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About | Nanomarx",
    description: "Learn more about Nanomarx, a community for innovators and thinkers.",
};

import AboutContent from '@/components/AboutContent';

export default function AboutPage() {
    return (
        <div className="min-h-screen">
            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <AboutContent />
            </div>
        </div>
    );
}
