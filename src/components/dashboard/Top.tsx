"use client";

import { Children, useState } from "react";
import { BasicArtistInfo, BasicTrackInfo } from "@/types/spotify";
import { AnimationProps, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { SpotifyLink } from "../ui/SpotifyLink";
import { useRouter } from "next/navigation";
import { GenreRank } from "@/lib/spotify";

export const TopTrackHighlight = ({ track }: { track: BasicTrackInfo }) => {
    const animation = track.ranking === 1 ? { y: -10 } : { y: 0 };

    const variants = {
        left: {
            x: "30%",
            y: 20,
            rotate: -15
        },
        right: {
            x: "-30%",
            y: 20,
            rotate: 15
        }
    }

    let variant = track.ranking === 2 ? "left" : "";
    if (track.ranking === 3) variant = "right";

    const router = useRouter();

    const linkClicked = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        router.push(track.public_url);
    }

    return (
        <div className="flex md:p-6 w-full h-full flex-col justify-center">
            <motion.div
                initial={variant}
                variants={variants}
                animate={animation}
                transition={{ duration: 3 + Math.random(), ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
                className={`relative flex items-center justify-center aspect-square rounded-2xl overflow-hidden shadow-md ${track.ranking === 3 ? "z-0" : "z-10"}`}>
                <Image className="object-cover absolute top-0 left-0" src={track.image} fill alt={track.name} />
                <div onClick={linkClicked}>
                    <SpotifyLink hovered width={30} height={30} />
                </div>
            </motion.div>
        </div>
    )
}

export const TopArtistHighlight = ({ artist }: { artist: BasicArtistInfo }) => {
    const animation = artist.ranking === 1 ? { y: -10 } : { y: 0 };

    const variants = {
        left: {
            x: "30%",
            y: 20,
            rotate: -15
        },
        right: {
            x: "-30%",
            y: 20,
            rotate: 15
        }
    }

    let variant = artist.ranking === 2 ? "left" : "";
    if (artist.ranking === 3) variant = "right";

    const router = useRouter();

    const linkClicked = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        router.push(artist.public_url);
    }

    return (
        <div className="flex w-full flex-col justify-center">
            <motion.div
                initial={variant}
                variants={variants}
                animate={animation}
                transition={{ duration: 3 + Math.random(), ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
                className={`relative flex items-center justify-center aspect-square rounded-full overflow-hidden shadow-md ${artist.ranking === 3 ? "z-0" : "z-10"}`}>
                <Image className="object-cover absolute top-0 left-0" src={artist.image} fill alt={artist.name} />
                <div onClick={linkClicked}>
                    <SpotifyLink hovered width={30} height={30} />
                </div>
            </motion.div>
        </div>
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

export const FavoriteGenres = ({ topGenres }: { topGenres: GenreRank[] }) => {
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
        <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="relative overflow-hidden rounded-lg h-full w-full" >
            <div className="absolute top-0 left-0 w-full h-full">
                <ScrollingGenre className="z-0 text-6xl" right={false} animationProps={{ initial: { rotate: -30 }, transition: { duration: duration(9) } }}>
                    {topGenres[0].genre}
                </ScrollingGenre>
                <ScrollingGenre className="z-10 text-xl md:text-2xl" animationProps={{ initial: { rotate: -30 }, transition: { duration: 15 } }}>
                    {topGenres[1].genre}
                </ScrollingGenre>
                <ScrollingGenre className="z-10 text-xs md:text-5xl" animationProps={{ initial: { rotate: -30 }, transition: { duration: 4 } }}>
                    {topGenres[2].genre}
                </ScrollingGenre>
                <ScrollingGenre right={false} className="z-10 text-4xl" animationProps={{ initial: { rotate: -30 }, transition: { duration: 12 } }}>
                    {topGenres[3].genre}
                </ScrollingGenre>
                <ScrollingGenre className="z-10 text-sm" animationProps={{ initial: { rotate: -30 }, transition: { duration: 20 } }}>
                    {topGenres[4].genre}
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