"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export const SignInButton = ({ children }: { children: React.ReactNode }) => {
    return (
        <button onClick={() => { signIn('spotify') }} className="pt-3 pb-3 pr-6 pl-6 transition-colors duration-150 ease-in hover:bg-secondary bg-primary font-extrabold text-lg rounded-full flex gap-3 items-center">
            <Image src="/spotify-icon-white.svg" alt="spotify" width={30} height={30} />
            {children}
        </button>
    );
}