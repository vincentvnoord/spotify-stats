import { useContext, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BasicArtistInfo } from "@/types/spotify";
import { SpotifyLink } from "../ui/SpotifyLink";
import SelectedArtistContext from "./SelectedArtistContext";

export const ArtistCard = ({ className, artist }: { className?: string, artist: BasicArtistInfo }) => {
    const { name, ranking, image, public_url, id } = artist;
    const { setSelectedArtist } = useContext(SelectedArtistContext);
    const ref = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);
    const isInView = useInView(ref, { amount: 0.5 });

    const onClick = () => {
        setSelectedArtist(id);
    }

    let backgroundCol = "bg-card";
    if (ranking === 1)
        backgroundCol = "bg-yellow-500";
    if (ranking === 2)
        backgroundCol = "bg-gray-400";
    if (ranking === 3)
        backgroundCol = "bg-yellow-700";

    return (
        <motion.div
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            ref={ref}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView && { opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`h-full cursor-pointer rounded-lg overflow-hidden w-full flex flex-col relative ${className}`}
        >
            <motion.div animate={hovered ? { scale: 0.9 } : { scale: 1 }} className={`w-full z-10 aspect-square overflow-hidden rounded-xl h-full flex flex-col relative`}>
                <Image className="object-cover" loading="eager" src={image} alt={name} fill sizes="600px" />
            </motion.div>

            <Ranking ranking={ranking} />

            <motion.div animate={hovered ? { opacity: 1 } : { opacity: 0 }} className={`${backgroundCol} rounded-2xl w-full h-full absolute`}></motion.div>

            <ArtistPublicLink public_url={public_url} name={name} cardHovered={hovered} />
        </motion.div>
    )
}

const Ranking = ({ ranking }: { ranking: number }) => {
    let backgroundCol = "bg-transparent";
    if (ranking === 1)
        backgroundCol = "bg-yellow-500";
    if (ranking === 2)
        backgroundCol = "bg-gray-400";
    if (ranking === 3)
        backgroundCol = "bg-yellow-700";

    return (
        <div className={`absolute top-0 z-10 left-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-center flex items-center justify-center aspect-square text-lg font-bold`}>
            <p className="rounded-br-lg w-full h-full flex items-center justify-center bg-card z-10">
                {ranking}
            </p>
            <motion.div animate={{ scale: 1.1 }} transition={{ delay: 0.3, duration: 0.3, ease: "easeInOut" }} className={`absolute rounded-tl-lg w-full h-full origin-top-left rounded-br-lg ${backgroundCol}`}></motion.div>
        </div>
    )
}

const ArtistPublicLink = ({ public_url, name, cardHovered }: { public_url: string, name: string, cardHovered: boolean }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <Link
            onMouseEnter={() => { setHovered(true) }}
            onMouseLeave={() => { setHovered(false) }}
            href={public_url}
            className="flex z-10 p-3 gap-2 items-center">
            <p className={`md:pl-3 text-center md:text-left truncate ${hovered && "underline"}`}>{name}</p>
            <SpotifyLink hovered={cardHovered} width={20} height={20} />
        </Link>
    )
}

export const LoadingCard = ({ index, className }: { index: number, className?: string }) => {


    return (
        <div className={`h-full relative overflow-hidden w-full flex flex-col gap-2 ${className}`}>
            <div className={`w-full aspect-square overflow-hidden rounded-xl h-full flex flex-col relative`}>
                <motion.div
                    animate={{ x: "100%" }}
                    initial={{ x: "-100%" }}
                    transition={{ duration: 0.6, ease: "easeInOut", delay: index * 0.02, repeat: Infinity }}
                    className="absolute w-full h-full rounded-md bottom-0 left-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                ></motion.div>
            </div>
        </div>
    )
}