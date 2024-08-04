"use client";

import { BasicArtistInfo, BasicTrackInfo } from "@/types/spotify"
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import { getTopArtists, getTopTracks } from "@/lib/spotify";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { motion, useInView, Variants } from "framer-motion";
import { ArtistCard, LoadingCard } from "./ArtistCard";
import SelectedArtistContext from "./SelectedArtistContext";

const cache = new Map<string, { list: BasicArtistInfo[], date: Date }>();

export const ArtistsGrid = () => {
    const { setSelectedArtist } = useContext(SelectedArtistContext);
    const [topArtists, setTopArtists] = useState<BasicArtistInfo[]>([]);
    const [loading, setLoading] = useState(false);
    const session = useSession();
    const searchParams = useSearchParams();
    const timeFrame = searchParams.get("timeRange") || "short_term";

    console.log(topArtists[0]);

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
            setSelectedArtist(artists[0].id);
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
