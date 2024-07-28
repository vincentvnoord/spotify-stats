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
import { UserProps } from "../header/User";

export default function ArtistsPage({ user }: { user: UserProps }) {
    return (
        <>
            <SelectedArtistProvider>
                <div className="w-full max-w-96 hidden xl:block">

                </div>
                <div className=" p-6">
                    <MainContent user={user}>
                        <div className="flex flex-col gap-4 md:p-6">
                            <PageHeader title="ARTISTS" />
                            <div className="h-0.5 w-full bg-secondary"></div>
                            <ArtistsGrid />
                        </div>
                    </MainContent>
                </div>
                <div className="absolute h-full z-30 w-full xl:p-6 xl:pl-0 top-0 flex flex-col xl:sticky xl:max-h-screen max-w-[600px] xl:max-w-[400px]">
                    <div className="sticky top-0 p-6 max-h-screen flex flex-col h-full xl:p-0">
                        <div className="rounded-2xl items-start flex flex-col bg-background overflow-hidden">
                            <SelectedArtist />
                        </div>
                    </div>
                </div>
            </SelectedArtistProvider>
        </>
    )
}