"use client";

import { BasicTrackInfo } from "@/types/spotify"
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { getTopTracks } from "@/lib/spotify";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { motion, useInView, Variants } from "framer-motion";

const cache = new Map<string, { list: BasicTrackInfo[], date: Date }>();

export const TrackList = () => {
    const [topTracks, setTopTracks] = useState<BasicTrackInfo[]>([]);
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
                const tracks = cache.get(timeFrame)?.list as BasicTrackInfo[];
                if (tracks.length > 0) {
                    const date = cache.get(timeFrame)?.date;
                    if (date && (new Date().getTime() - date.getTime()) < 1000 * 120) {
                        setTopTracks(tracks);
                        return;
                    }
                }
            }

            setLoading(true);
            const tracks = await getTopTracks(session.data?.accessToken as string, timeFrame);
            cache.set(timeFrame, { list: tracks, date: new Date() });
            setTopTracks(tracks);
            setLoading(false);
        };

        fetchTopTracks();
    }, [timeFrame, session.data?.accessToken]);

    return (
        <motion.div className="flex flex-col gap-2">
            {
                loading ?
                    Array.from({ length: 20 }).map((_, index) => (
                        <LoadingCard key={index} index={index} />
                    ))
                    :
                    topTracks.map((track) => (
                        <TrackCard key={track.ranking} {...track} />
                    ))
            }
        </motion.div>
    )
}

const TrackCard = ({ name, ranking, artist, image }: BasicTrackInfo) => {
    const [hovered, setHovered] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: "100%" }}
            animate={isInView && { opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`flex justify-between items-center p-3 rounded-lg ${hovered ? "bg-card" : ""}`}
        >
            <div className="flex gap-4 items-center">
                <p className="text-xl min-w-9 text-center text-secondary">{ranking}</p>
                <div className="w-10 h-10 object-contain relative rounded-md overflow-hidden">
                    <Image className="object-cover" src={image} alt="track" fill />
                </div>
                <div className="flex flex-col">
                    <p className="">{name}</p>
                    <p className="text-secondary text-sm">{artist}</p>
                </div>
            </div>

            <SpotifyLink hovered={hovered} />
        </motion.div >
    )
}

const LoadingCard = ({ index }: { index: number }) => {


    return (
        <div className="relative overflow-hidden min-h-[68px] rounded-md">
            <div className="opacity-0">
            </div>
            <motion.div
                animate={{ x: "100%" }}
                initial={{ x: "-100%" }}
                transition={{ duration: 0.6, ease: "easeInOut", delay: index * 0.02, repeat: Infinity }}
                className="absolute w-full h-full rounded-md bottom-0 left-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            ></motion.div>
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