import React from "react";
import Image from "next/image";
import { TimeFrameButton } from "@/components/ui/Buttons";
import { getSession } from "@/auth";
import { redirect } from "next/navigation";
import { getTopArtists } from "@/lib/spotify";
import { ArtistsPage } from "@/components/artists/ArtistList";
import { PageHeader } from "@/components/PageHeader";


export default async function Artists({ searchParams }: { searchParams: { timeRange?: string } }) {
    const session = await getSession();
    if (!session) {
        redirect("/");
    }

    return (
        <main className="w-full relative h-full flex flex-col gap-3 p-3">
            <PageHeader title="ARTISTS" />
            <div className="h-0.5 w-full bg-secondary"></div>
            <ArtistsPage />
        </main>
    );
}

const ArtistCard = ({ className, name, ranking, image }: { className?: string, name: string, ranking: number, image: string }) => {


    return (
        <div className={`h-full w-full flex flex-col gap-2 ${className}`}>
            <div className={`w-full aspect-square overflow-hidden rounded-xl h-full flex flex-col relative`}>
                <Image className="object-cover" src={image} alt={name} fill />
            </div>
            <p className="pl-3 font-extrabold text-lg">{ranking}. {name}</p>
        </div>
    )
}