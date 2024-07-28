"use client";

import { getSession } from "@/auth";
import Image from "next/image"
import Link from "next/link"
import { getUserData } from "@/lib/spotify";
import React, { useEffect } from "react";
import UserInfo, { UserProps } from "./User";
import { useSession } from "next-auth/react";

export const Header = ({ user }: { user: UserProps }) => {

    return (
        <header className="flex bg-background w-full max-w-screen-lg rounded-lg items-center justify-between p-4">
            <div className="md:hidden">
                <button >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>

            <div className="flex gap-4 items-center">
                <h1 className="text-3xl font-extrabold">LOGO</h1>
                <nav className="bg-card rounded-md p-3 hidden md:block">
                    <ul className="flex gap-3 text-md font-semibold">
                        <NavElement href="/tracks">TRACKS</NavElement>
                        <NavElement href="/artists">ARTISTS</NavElement>
                        <NavElement href="/genres">GENRES</NavElement>
                    </ul>
                </nav>
            </div>

            <UserInfo {...user} />
        </header>
    )
}


const NavElement = ({ children, href }: { children: React.ReactNode, href: string }) => {


    return (
        <Link href={href} >
            <li>{children}</li>
        </Link>
    )
}