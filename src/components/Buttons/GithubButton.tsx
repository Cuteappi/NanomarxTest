"use client";

import { useAuthActions } from "@convex-dev/auth/react";

export default function GithubButton() {

    const { signIn } = useAuthActions();

    async function handleClick() {
        await signIn("github");
    }
    return (
        <button
            onClick={handleClick}
            className="mt-1 w-full bg-[#333] hover:bg-[#444] text-white font-normal py-1 px-4 border border-[#4a4a4a] rounded-none text-sm">
            GitHub
        </button>
    );
}