"use client";

import { Link2Icon, LinkIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { motion, Variants } from "framer-motion";
import React from "react";
import Link from "next/link";

export const UserActions = ({ selected, menuRef }: { selected: boolean, menuRef: React.RefObject<HTMLDivElement> }) => {
    const variants: Variants = {
        hidden: {
            y: "-100%",
            opacity: 0,
            pointerEvents: "none"
        },
        visible: {
            y: 0,
            opacity: 1,
            pointerEvents: "all"
        }
    }

    return (
        <div className={`absolute -bottom-4 translate-y-[100%] -right-2 z-50 ${selected ? "pointer-events-all" : "pointer-events-none"}`}>
            <motion.div initial="hidden" variants={variants} animate={selected ? "visible" : "hidden"}>
                <div ref={menuRef} className="p-[5px] flex flex-col items-center rounded-md min-w-48 bg-card">
                    <UserActionButton>
                        <Link href="https://www.spotify.com/account/overview/">
                            <div className="flex justify-between items-center">
                                Account
                                <LinkIcon size={16} />
                            </div>
                        </Link>
                    </UserActionButton>

                    <div className="w-full h-[1px] bg-white/10"></div>
                    <UserActionButton onClick={() => { signOut() }}>Log out</UserActionButton>
                </div>
            </motion.div>
        </div>
    )
}

const UserActionButton = ({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) => {
    return (
        <button onClick={onClick} className="p-2 w-full text-left text-sm hover:bg-secondary rounded-sm">{children}</button>
    )
}