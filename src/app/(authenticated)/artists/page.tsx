import React from "react";
import Image from "next/image";
import { TimeFrameButton } from "@/components/ui/Buttons";
import { getSession } from "@/auth";
import { redirect } from "next/navigation";
import { getArtistData } from "@/lib/spotify";
import { ArtistsPage } from "@/components/artists/ArtistList";
import { PageHeader } from "@/components/PageHeader";
import { MainContent } from "@/components/ui/Containers";
import { PopularSongs } from "@/components/artists/PopularSongs";


export default async function Artists({ searchParams }: { searchParams: { timeRange?: string } }) {
    const session = await getSession();
    if (!session || !session.accessToken) {
        redirect("/");
    }

    const testArtistID = "4kqFrZkeqDfOIEqTWqbOOV";
    const artistData = await getArtistData(session.accessToken, testArtistID);
    const image = artistData?.images[0].url;
    console.log(artistData);

    return (
        <main className="w-full relative h-full flex justify-center gap-3 p-3">
            <div className="w-full max-w-96">

            </div>
            <MainContent>
                <div className="flex flex-col gap-4 md:p-6">
                    <PageHeader title="ARTISTS" />
                    <div className="h-0.5 w-full bg-secondary"></div>
                    <ArtistsPage />
                </div>
            </MainContent>
            <div className="w-full top-5 h-fit sticky bg-background max-w-[400px] rounded-2xl overflow-hidden">
                <div className="relative">
                    <div className="pt-48 z-20 relative p-4 flex flex-col gap-1">
                        <p className="text-5xl font-extrabold">brakence</p>
                        <p className="text-sm text-foreground">{artistData?.followers} followers</p>
                    </div>
                    <div className="absolute z-10 w-full top-0 left-0 h-full bg-gradient-to-t from-black/60 to-transparent rounded-b-3xl">
                    </div>
                    <Image src={image ?? "/songtest.png"} alt="meh" fill className="object-cover absolute -z-0 rounded-b-3xl" />
                </div>
                <PopularSongs songs={artistData?.topTracks ?? []} />
            </div>
        </main>
    );
}
