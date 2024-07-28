"use client";

import { MainContent } from "../ui/Containers"
import { PageHeader } from "../PageHeader"
import Image from "next/image"
import { PopularSongs } from "./PopularSongs"
import { SelectedArtist } from "./SelectedArtist"
import { FullArtistInfo } from "@/types/spotify";
import React, { useContext, useState } from "react";
import { ArtistsGrid } from "./ArtistList";
import SelectedArtistProvider from "./SelectedArtistProvider";
import { UserProps } from "../header/User";
import SelectedArtistContext from "./SelectedArtistContext";

export default function ArtistsPage({ user }: { user: UserProps }) {
    const { selectedArtist, setSelectedArtist } = useContext(SelectedArtistContext);

    return (
        <>
            <SelectedArtistProvider>
                <div className="w-full max-w-96 hidden xl:block">

                </div>
                <div className="">
                    <MainContent user={user}>
                        <div className="flex flex-col gap-4 md:p-6">
                            <PageHeader title="ARTISTS" />
                            <div className="h-0.5 w-full bg-secondary"></div>
                            <ArtistsGrid />
                        </div>
                    </MainContent>
                </div>

                <SideContent>
                    <SelectedArtist />
                </SideContent>
            </SelectedArtistProvider >
        </>
    )
}

const SideContent = ({ children }: { children: React.ReactNode }) => {
    const { selectedArtist, setSelectedArtist } = useContext(SelectedArtistContext);
    const defaultStyle = "absolute h-full z-30 w-full xl:p-6 xl:pl-0 top-0 flex flex-col items-center xl:max-w-[400px] xl:sticky xl:max-h-screen";

    return (
        <div className={`${defaultStyle} ${selectedArtist ? "pointer-events-all bg-black/50" : "pointer-events-none"}`}>
            <div className="sticky top-0 p-6 max-h-screen flex flex-col items-center w-full h-full xl:p-0">
                <div className="rounded-2xl w-full items-start flex flex-col bg-background overflow-hidden max-w-[600px] xl:max-w-[400px]">
                    {children}
                </div>
            </div>
        </div >
    )
}