"use client";

import { FullArtistInfo } from "@/types/spotify";
import { PopularSongs } from "./PopularSongs";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import SelectedArtistContext from "./SelectedArtistContext";
import { getArtistData } from "@/lib/spotify";
import { useSession } from "next-auth/react";
import { XIcon } from "lucide-react";

export const SelectedArtist = () => {
    const [artistData, setArtistData] = useState<FullArtistInfo | null>(null);
    const session = useSession();
    const { selectedArtist, setSelectedArtist } = useContext(SelectedArtistContext);

    useEffect(() => {
        const fetchArtist = async () => {
            if (!selectedArtist) return;
            if (!session.data?.accessToken) return;

            const artist = await getArtistData(session.data.accessToken, selectedArtist);
            setArtistData(artist);
        }

        fetchArtist();

    }, [selectedArtist]);

    if (!artistData) return null;
    if (!selectedArtist) return null;

    const image = artistData.images[1].url ?? artistData.images[0].url;

    return (
        <>
            <div className="relative w-full">
                <div className="pt-48 z-20 relative p-4 flex flex-col gap-1">
                    <p className="text-5xl font-extrabold">{artistData.name}</p>
                    <p className="text-sm text-foreground">{artistData.followers} followers</p>
                </div>
                <div className="absolute z-10 w-full top-0 left-0 h-full bg-gradient-to-t from-black/60 to-transparent rounded-b-3xl">
                </div>
                <Image src={image ?? "/songtest.png"} alt="meh" fill className="object-cover absolute -z-0 rounded-b-3xl" />
                <div className="absolute z-50 top-0 right-0 p-3">
                    <button onClick={() => { setSelectedArtist(null); setArtistData(null); }} className="bg-background hover:bg-card rounded-full p-2">
                        <XIcon size={20} />
                    </button>
                </div>
            </div>
            <div className="overflow-scroll w-full overflow-x-clip">
                <PopularSongs songs={artistData.topTracks ?? []} />
            </div>
        </>
    )
};