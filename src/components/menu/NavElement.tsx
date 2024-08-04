"use client";

import Image from "next/image"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

const NavElement = ({ className, children, image, href }: { className?: string, children: React.ReactNode, image: string, href: string }) => {
    const [loaded, setLoaded] = useState(false);
    const [hovered, setHovered] = useState(false);

    const pathName = usePathname();
    const selected = href === pathName;

    return (
        <motion.div className={className} whileHover={{ scale: 1.05 }}>
            <Link onMouseLeave={() => { setHovered(false) }} onMouseEnter={() => { setHovered(true) }} className={`flex h-full bg-card z-20 p-3 rounded-lg overflow-hidden relative items-end pt-5`} href={href}>
                <Image onLoad={() => { setLoaded(true) }}
                    className={`object-cover transition-all duration-200 ease-in opacity-0 z-0 saturate-0 ${loaded ? "opacity-100" : "opacity-0"} ${selected || hovered ? "saturate-100" : "saturate-0 opacity-50"}`}
                    src={image} fill sizes="100vw" alt="nav image" />
                <p className={`transition-all duration-200 ease-in z-20 font-extrabold text-2xl ${selected ? "text-primary" : ""}`}>{children}</p>
                <div className="absolute z-10 w-full top-0 left-0 h-full bg-gradient-to-t from-black/60 to-transparent">
                </div>
            </Link>
        </motion.div>
    )
}

export default NavElement;