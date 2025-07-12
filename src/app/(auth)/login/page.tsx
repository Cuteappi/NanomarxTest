"use client";
import GithubButton from "../../../components/Buttons/GithubButton";
import { useState } from 'react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement username/password sign-in logic
        console.log('Login attempt with:', { email, password });
    };

    return (
        <div className="bg-[#0c0c0c] text-[#aaaaaa]">
            <div className="mx-auto pt-2 px-4">
                <h1 className="text-[12pt] font-semibold text-white mb-4">Login</h1>
                {/* <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                    <div className="flex items-start justify-start">
                        <label htmlFor="email" className="w-48 text-left pr-4 flex-shrink-0">E-mail or Username:</label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-grow bg-[#1e1e1e] border border-[#4a4a4a] rounded-none px-2 py-1 text-white focus:outline-none focus:border-gray-400"
                        />
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="password" className="w-48 text-left pr-4 flex-shrink-0">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="flex-grow bg-[#1e1e1e] border border-[#4a4a4a] rounded-none px-2 py-1 text-white focus:outline-none focus:border-gray-400"
                        />
                    </div>
                    <div className="flex">
                        <div className="flex-grow">
                            <button type="submit" className="bg-[#333] hover:bg-[#444] text-white font-normal py-1 px-4 border border-[#4a4a4a] rounded-none text-sm">
                                Login
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col mt-6">
                        <span className="text-lg text-center">Or with</span>
                    </div>
                </form> */}
                <GithubButton />



                <div className="mt-10 text-sm space-y-4 text-gray-400">
                    <p>Forgot your password or deleted your account? <a href="#" className="text-blue-400 hover:underline">Reset your password.</a></p>
                    <p>Not a user yet? Read about <a href="#" className="text-blue-400 hover:underline">how invitations work</a> and see if you know <a href="#" className="text-blue-400 hover:underline">a current user</a> of the site. The <a href="#" className="text-blue-400 hover:underline">chat room</a> does not require an invitation.</p>
                </div>
            </div>
        </div>
    );
}

