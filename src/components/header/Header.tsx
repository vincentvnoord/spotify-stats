import { getSession } from "@/auth";
import Image from "next/image"
import Link from "next/link"
import { getUserData } from "@/lib/spotify";
import React from "react";
import UserInfo, { UserProps } from "./User";

export const Header = async () => {
    const session = await getSession();

    const user = await getUserData(session?.accessToken as string);
    let avatar = "";
    if (user.images.length > 0) {
        avatar = user.images[0].url;
    }
    console.log(user);

    const userInfo: UserProps = {
        display_name: user.display_name,
        images: user.images
    }

    return (
        <header className="flex bg-background rounded-lg items-center justify-between p-4">
            <div className="flex gap-4 items-center">
                <h1 className="text-3xl font-extrabold">LOGO</h1>
                <nav className="bg-card rounded-md p-3">
                    <ul className="flex gap-3 text-md font-semibold">
                        <NavElement href="/tracks">TRACKS</NavElement>
                        <NavElement href="/artists">ARTISTS</NavElement>
                        <NavElement href="/genres">GENRES</NavElement>
                    </ul>
                </nav>
            </div>

            <UserInfo {...userInfo} />
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