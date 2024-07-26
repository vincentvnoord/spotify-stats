"use client";

import { BasicArtistInfo, BasicTrackInfo } from "@/types/spotify";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { SpotifyLink } from "../ui/SpotifyLink";
import Link from "next/link";

export const PopularSongs = ({ songs }: { songs: BasicTrackInfo[] }) => {
    const [showMore, setShowMore] = useState(false);

    return (
        <div className="p-4">
            <p className="text-lg font-bold">Popular songs</p>
            <div className="flex flex-col gap-2 p-3">
                {songs.map((track, index) => {
                    if (!showMore && index > 4) return null;

                    return (
                        <PopularSong key={index} song={track} />
                    );
                })}
            </div>
            {songs.length > 5 && (
                <button onClick={() => setShowMore(!showMore)} className="text-sm text-foreground hover:text-white font-semibold">
                    {showMore ? "Show less" : "Show more"}
                </button>
            )}
        </div>
    )
};

const PopularSong = ({ song }: { song: BasicArtistInfo }) => {
    const [hovered, setHovered] = useState(false);
    const { name, ranking, image, public_url } = song;

    return (
        <motion.div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            initial={{ y: "-100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex cursor-pointer justify-between items-center gap-4">
            <div className="flex items-center gap-2">
                <p className="text-foreground min-w-5 text-center">{ranking}</p>
                <Image className="aspect-square rounded-lg object-cover" src={image} alt={name} width={40} height={40} />
                <p className="">{name}</p>
            </div>

            <Link href={public_url}>
                <SpotifyLink hovered={hovered} />
            </Link>
        </motion.div>
    );
}