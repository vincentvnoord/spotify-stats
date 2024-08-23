import { HomeIcon, LayoutGrid } from "lucide-react";
import { User } from "./user/User";
import Link from "next/link";

export default function Header() {

    return (
        <header className="flex p-2 pb-0 w-full items-center justify-between flex-none">
            <Link href={"/dashboard"}>
                <LayoutGrid className="h-10 w-10" size={10} />
            </Link>
            <User />
        </header>
    )
}