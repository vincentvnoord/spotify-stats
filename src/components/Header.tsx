import { HomeIcon } from "lucide-react";
import { User } from "./user/User";

export default function Header() {

    return (
        <header className="flex p-2 pb-0 w-full items-center justify-between flex-none">
            <HomeIcon className="h-8 w-8" />
            <User />
        </header>
    )
}