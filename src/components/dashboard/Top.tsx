"use client";

import { Children, useState } from "react";
import { BasicArtistInfo, BasicTrackInfo } from "@/types/spotify";
import { AnimationProps, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { SpotifyLink } from "../ui/SpotifyLink";
import { useRouter } from "next/navigation";

export const FavoriteArtist = ({ className, artist }: { className?: string, artist: BasicArtistInfo }) => {
    const { name, image, public_url, id } = artist;
    const [hovered, setHovered] = useState(false);
    const classNames = `${artist.ranking > 3 && "hidden xl:flex"} ${artist.ranking === 3 && "hidden md:flex"} ${artist.ranking >= 4 && artist.ranking <= 5 ? "hidden lg:flex" : ""}`

    return (
        <motion.div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`h-full max-h-32 cursor-pointer rounded-lg overflow-hidden w-full flex flex-col relative ${className}`}
        >
            <motion.div animate={hovered ? { scale: 0.9 } : { scale: 1 }} className={`w-full z-10 aspect-square overflow-hidden rounded-lg h-full flex flex-col relative`}>
                <Image className="object-cover" loading="eager" src={image} alt={name} fill sizes="600px" />
            </motion.div>

            <ArtistPublicLink public_url={public_url} name={name} cardHovered={hovered} />
        </motion.div>
    )
}

export const FavoriteTrack = ({ className, artist }: { className?: string, artist: BasicTrackInfo }) => {
    const { name, image, public_url } = artist;
    const [hovered, setHovered] = useState(false);
    const classNames = `${artist.ranking > 3 && "hidden xl:flex"} ${artist.ranking === 3 && "hidden md:flex"} ${artist.ranking >= 4 && artist.ranking <= 5 ? "hidden lg:flex" : ""}`

    return (
        <motion.div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`max-h-32 h-full cursor-pointer rounded-lg overflow-hidden w-full flex flex-col relative ${className}`}
        >
            <motion.div animate={hovered ? { scale: 0.9 } : { scale: 1 }} className={`w-full z-10 aspect-square overflow-hidden rounded-lg h-full flex flex-col relative`}>
                <Image className="object-cover" loading="eager" src={image} alt={name} fill sizes="600px" />
            </motion.div>

            <ArtistPublicLink public_url={public_url} name={name} cardHovered={hovered} />
        </motion.div>
    )
}

const ArtistPublicLink = ({ public_url, name, cardHovered }: { public_url: string, name: string, cardHovered: boolean }) => {
    const router = useRouter();
    const [hovered, setHovered] = useState(false);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        router.push(public_url);
    }

    return (
        <div
            onClick={handleClick}
            onMouseEnter={() => { setHovered(true) }}
            onMouseLeave={() => { setHovered(false) }}
            className="flex z-10 pt-3 gap-2 items-center justify-center">
            <p className={`md:pl-3 text-sm font-semibold text-center md:text-left truncate ${hovered && "underline"}`}>{name}</p>
            <SpotifyLink hovered={cardHovered} width={20} height={20} />
        </div>
    )
}

export const FavoriteGenres = () => {
    const [hovered, setHovered] = useState(false);
    const durations = [9, 15, 4, 15, 15];

    const duration = (dur: number) => {
        if (hovered)
            return dur * 0.2;

        return dur;
    }

    const handleHover = () => {

    }

    return (
        <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="relative bg-black/50 overflow-hidden rounded-lg h-full w-full" >
            <div className="absolute top-0 left-0 w-full h-full">
                <ScrollingGenre className="z-0 text-6xl" right={false} animationProps={{ initial: { rotate: -30 }, transition: { duration: duration(9) } }}>
                    POP MERSIC YA MEEN
                </ScrollingGenre>
                <ScrollingGenre className="z-10 text-xl md:text-2xl" animationProps={{ initial: { rotate: -30 }, transition: { duration: 15 } }}>
                    POP MERSIC YA MEEN
                </ScrollingGenre>
                <ScrollingGenre className="z-10 text-xs md:text-5xl" animationProps={{ initial: { rotate: -30 }, transition: { duration: 4 } }}>
                    MELODIC RAP
                </ScrollingGenre>
                <ScrollingGenre right={false} className="z-10 text-4xl" animationProps={{ initial: { rotate: -30 }, transition: { duration: 12 } }}>
                    COUNTRY
                </ScrollingGenre>
                <ScrollingGenre className="z-10 text-sm" animationProps={{ initial: { rotate: -30 }, transition: { duration: 20 } }}>
                    METAL
                </ScrollingGenre>
            </div>
        </div >
    )
}

const ScrollingGenre = ({ animationProps, className, rotation = -30, children, right = true }: { animationProps: AnimationProps, className?: string, rotation?: number, children: React.ReactNode, right?: boolean }) => {
    const variants = {
        from: {
            x: right ? "-100%" : "100%"
        },
        to: {
            x: right ? "200%" : "-200%"
        }
    }


    return (
        <motion.div className={`origin-center text-nowrap w-full flex flex-col items-center text-center font-extrabold ${className}`} initial={{ rotate: rotation }}>
            <motion.div className="relative w-full origin-right" initial="from" animate="to" variants={variants} transition={{ repeat: Infinity, ease: "linear", ...animationProps.transition }}>
                <motion.p
                    className="transition-all duration-200 ease-in-out hover:text-primary hover:scale-105"
                >
                    {children}
                </motion.p>
            </motion.div>
        </motion.div>
    )
}