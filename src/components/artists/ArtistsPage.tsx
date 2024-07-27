"use client";

import { MainContent } from "../ui/Containers"
import { PageHeader } from "../PageHeader"
import Image from "next/image"
import { PopularSongs } from "./PopularSongs"
import { SelectedArtist } from "./SelectedArtist"
import { FullArtistInfo } from "@/types/spotify";
import { useState } from "react";
import { ArtistsGrid } from "./ArtistList";
import SelectedArtistProvider from "./SelectedArtistProvider";

export default function ArtistsPage() {
    return (
        <>
            <SelectedArtistProvider>
                <div className="w-full max-w-96">

                </div>
                <div className="pt-6 pb-6">
                    <MainContent>
                        <div className="flex flex-col gap-4 md:p-6">
                            <PageHeader title="ARTISTS" />
                            <div className="h-0.5 w-full bg-secondary"></div>
                            <ArtistsGrid />
                        </div>
                    </MainContent>
                </div>
                <div className="absolute z-30 w-full p-6 xl:pl-0 top-0 flex flex-col xl:sticky max-h-screen max-w-[400px]">
                    <div className="rounded-2xl items-start flex flex-col bg-background overflow-hidden">
                        <SelectedArtist />
                    </div>
                </div>
            </SelectedArtistProvider>
        </>
    )
}