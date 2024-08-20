import { HomeIcon } from "lucide-react";
import { User } from "./user/User";
import Link from "next/link";

export default function Header() {

    return (
        <header className="flex p-2 pb-0 w-full items-center justify-between flex-none">
            <Link href={"/"}>
                <HomeIcon className="h-8 w-8" />
            </Link>
            <User />
        </header>
    )
}