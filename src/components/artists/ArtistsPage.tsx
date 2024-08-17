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
import { UserProps } from "../user/UserClient";
import SelectedArtistContext from "./SelectedArtistContext";

export default function ArtistsPage({ }: {}) {

    return (
        <>
            <SelectedArtistProvider>
                <SideContent />
                <div className="w-full h-full">
                    <MainContent>
                        <div className="flex w-full flex-col gap-4 md:p-6">
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

export const SideContent = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
    const { selectedArtist, setSelectedArtist } = useContext(SelectedArtistContext);
    const defaultStyle = "absolute h-full z-30 w-full xl:p-6 xl:pl-0 top-0 flex flex-col items-center xl:max-w-[400px] xl:sticky xl:max-h-screen";

    if (!selectedArtist) return null;

    return (
        <div className={`${defaultStyle} ${selectedArtist ? "pointer-events-all" : "pointer-events-none"} ${className}`}>
            <div className={`absolute transition-all duration-200 ease-in z-10 inset-0 ${selectedArtist ? "pointer-events-all backdrop-blur-md" : "pointer-events-none"}`}></div>
            <div className="sticky z-30 top-0 p-3 flex flex-col items-center w-full h-full xl:p-0">
                <div className="rounded-lg w-full items-start flex flex-col bg-background overflow-hidden max-w-[600px] xl:max-w-[400px]">
                    {children}
                </div>
            </div>
        </div >
    )
}