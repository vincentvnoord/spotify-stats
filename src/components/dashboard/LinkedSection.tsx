"use client";

import Link from "next/link"
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export const LinkedSection = ({ children, title, href, className }: { children: React.ReactNode, title: string, href: string, className?: string }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div className={`w-full h-full ${className}`}>
            <Link onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} href={href}>
                <div className={`relative overflow-hidden transition-colors duration-150 ease-in flex pl-4 pr-4 flex-col p-2 bg-black hover:bg-card rounded-lg gap-4 w-full h-full ${className}`}>
                    <div className="w-full h-full pb-2">
                        {children}
                    </div>
                    <div className="absolute pointer-events-none top-0 left-0 z-20 bg-gradient-to-t from-black via-transparent to-transparent w-full h-full flex flex-col justify-end p-3">
                        <div className="flex gap-2">
                            <p className="text-xl font-bold">{title}</p>
                        </div>
                        <motion.div initial={{ height: 0 }} animate={hovered ? { height: "auto" } : { height: 0 }} className="overflow-clip text-secondary font-semibold text-sm flex">
                            <p>
                                Show all
                            </p>
                            <ArrowRight className="h-4 w-4" />
                        </motion.div>
                    </div>
                </div>
            </Link>
        </div>
    )
}