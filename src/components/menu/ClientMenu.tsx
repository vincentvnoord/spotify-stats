"use client";

import { useRef, useEffect, useState } from "react";
import NavElement from "./NavElement"
import { BarChartIcon, LibraryIcon } from "lucide-react"
import { motion, Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import Image from "next/image";

export const ClientMenu = ({ images, userUI }: { images: string[], userUI: React.ReactNode }) => {
    const [menuOpen, setMenuOpen] = useState(true);
    const pathName = usePathname();
    const menuRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (document.body.clientWidth < 1280) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        }
    }

    useEffect(() => {
        if (document.body.clientWidth < 1280) {
            setMenuOpen(false);
        }
    }, [pathName]);

    useEffect(() => {
        if (menuOpen) {
            document.addEventListener("click", handleClickOutside);
        } else {
            document.removeEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [menuOpen]);

    const variants: Variants = {
        open: {
            y: 0,
            opacity: 1,
            pointerEvents: "auto"
        },
        closed: {
            y: "100%",
            opacity: 0,
            pointerEvents: "none"
        }
    }

    return (
        <div className={`w-full transition-all duration-200 ease-in ${menuOpen ? "backdrop-blur-sm" : null} h-full xl:h-fit justify-end items-center flex flex-col gap-2 overflow-hidden xl:max-w-[400px]`}>
            <motion.div ref={menuRef} initial="closed" animate={menuOpen ? "open" : "closed"} variants={variants} className="w-full overflow-hidden pointer-events-auto gap-3 flex-col bg-background p-3 rounded-lg">
                <div className="flex flex-col">
                    <div className="flex items-center">
                        <BarChartIcon size={24} />
                        <p className="text-xl font-bold p-2">Top </p>
                    </div>
                    <nav className="grid gap-2 grid-cols-2 grid-rows-2 w-full">
                        <NavElement href="/tracks" image={images[0]} className="row-span-2">
                            SONGS
                        </NavElement>

                        <NavElement href="/artists" image={images[1]}>
                            ARTISTS
                        </NavElement>

                        <NavElement href="/genres" image={images[2]}>
                            GENRES
                        </NavElement>
                    </nav>
                </div>
            </motion.div>
            <motion.div ref={menuRef} initial="closed" animate={menuOpen ? "open" : "closed"} variants={variants} className="w-full overflow-hidden pointer-events-auto gap-3 flex-col bg-background p-3 rounded-lg">
                {userUI}
                <div className="w-full h-96">
                    <div className="w-full flex gap-2 items-center">
                        <div className="w-12 h-12 relative overflow-hidden">
                            <Image className="object-cover" src="/songtest.png" fill alt="currentsong" />
                        </div>
                        <p>Song title</p>
                    </div>
                </div>
            </motion.div>
            <div className="flex bg-gradient-to-t from-black/60 to-transparent pointer-events-auto xl:hidden p-3 pb-5 justify-around w-full">
                <LibraryIcon size={24} />
                <BarChartIcon onClick={() => { setMenuOpen(!menuOpen) }} size={24} />
            </div>
        </div>
    )
}