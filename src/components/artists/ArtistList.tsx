"use client";

import { BasicArtistInfo, BasicTrackInfo } from "@/types/spotify"
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { getTopArtists, getTopTracks } from "@/lib/spotify";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { motion, useInView, Variants } from "framer-motion";

const cache = new Map<string, { list: BasicArtistInfo[], date: Date }>();

export const ArtistsPage = () => {
    const [topArtists, setTopArtists] = useState<BasicArtistInfo[]>([]);
    const [loading, setLoading] = useState(false);
    const session = useSession();
    const searchParams = useSearchParams();
    const timeFrame = searchParams.get("timeRange") || "short_term";

    useEffect(() => {
        const fetchTopTracks = async () => {
            if (!session.data?.accessToken) {
                return;
            }

            if (cache.has(timeFrame)) {
                const tracks = cache.get(timeFrame)?.list as BasicArtistInfo[];
                if (tracks.length > 0) {
                    const date = cache.get(timeFrame)?.date;
                    if (date && (new Date().getTime() - date.getTime()) < 1000 * 120) {
                        setTopArtists(tracks);
                        return;
                    }
                }
            }

            setLoading(true);
            const artists = await getTopArtists(session.data?.accessToken as string, timeFrame);
            cache.set(timeFrame, { list: artists, date: new Date() });
            setLoading(false);
            setTopArtists(artists);
        };

        fetchTopTracks();
    }, [timeFrame, session.data?.accessToken]);

    return (
        <div className="w-full self-center">
            <div className="grid grid-cols-2 md:grid-cols-4 sm:grid-cols-3 gap-5 w-full">
                {
                    loading ?
                        <>
                            <LoadingCard key={-1} index={-1} className="row-span-2 col-span-2" />
                            {Array.from({ length: 10 }).map((_, index) => (
                                <LoadingCard key={index} index={index} />
                            ))}
                        </>
                        :
                        <ArtistsList artists={topArtists} />
                }
            </div>
        </div>
    )
}

const ArtistsList = ({ artists }: { artists: BasicArtistInfo[] }) => {
    if (!artists || artists.length === 0) {
        return null;
    }

    return (
        <>
            <ArtistCard key={0} artist={artists[0]} className="row-span-2 col-span-2" />
            {artists.slice(1).map((artist, index) => (
                <ArtistCard key={index} artist={artist} />
            ))}
        </>
    )
}

const ArtistCard = ({ className, artist }: { className?: string, artist: BasicArtistInfo }) => {
    const { name, ranking, image } = artist;
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref);
    let backgroundCol = "bg-transparent";
    if (ranking === 1)
        backgroundCol = "bg-yellow-500";
    if (ranking === 2)
        backgroundCol = "bg-gray-400";
    if (ranking === 3)
        backgroundCol = "bg-yellow-900";

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView && { opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`h-full rounded-lg overflow-hidden w-full flex flex-col gap-2 relative ${className}`}>
            <div className={`w-full aspect-square overflow-hidden rounded-xl h-full flex flex-col relative`}>
                <Image className="object-cover" src={image} alt={name} fill />
            </div>
            <div className={`absolute top-0 left-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-center flex items-center justify-center aspect-square text-lg font-bold`}>
                <p className="rounded-br-lg w-full h-full flex items-center justify-center bg-card z-10">
                    {ranking}
                </p>
                <motion.div animate={{ scale: 1.1 }} transition={{ delay: 0.3, duration: 0.3, ease: "easeInOut" }} className={`absolute rounded-tl-lg w-full h-full origin-top-left rounded-br-lg ${backgroundCol}`}></motion.div>
            </div>
            <p className="md:pl-3 text-center md:text-left truncate font-bold md:font-extrabold md:text-lg">{name}</p>
        </motion.div>
    )
}

const LoadingCard = ({ index, className }: { index: number, className?: string }) => {


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

const SpotifyLink = ({ hovered }: { hovered: boolean }) => {
    const variants: Variants = {
        hidden: {
            opacity: 0,
            x: "-100%"
        },
        visible: {
            opacity: 1,
            x: 0,
        }
    }

    return (
        <motion.div variants={variants} animate={hovered ? "visible" : "hidden"} initial="hidden">
            <div className="h-full flex items-center">
                <Image src="/spotify-icon.svg" alt="spotify" width={30} height={30} />
            </div>
        </motion.div>
    )
}
