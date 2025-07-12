
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="my-8 py-4 gap-5 text-md font-semibold text-center text-[#a8a8a8]">
            <div className="flex justify-end gap-5">
                <Link href="/about">About</Link>
                <Link href="/tags">Tags</Link>
            </div>
        </footer>
    );
}