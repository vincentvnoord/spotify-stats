"use client";

import SelectedArtistProvider from "@/components/artists/SelectedArtistProvider";
import { SideContent } from "@/components/artists/ArtistsPage";
import { MainContent } from "@/components/ui/Containers";
import { SelectedArtist } from "@/components/artists/SelectedArtist";
import { SessionProvider } from "next-auth/react";
import MainPlayer from "./player/MainPlayer";

export default function AuthLayoutContext({ children, header }: { children: React.ReactNode, header: React.ReactNode }) {
    return (
        <>
            <SessionProvider>
                <SelectedArtistProvider>
                    {header}
                    <div className="w-full min-h-0 flex flex-grow p-2">
                        <div className="w-full h-full flex gap-2">
                            <div className="overflow-hidden bg-background rounded-lg w-full h-full flex flex-col">
                                <div className="overflow-scroll overflow-x-hidden flex flex-col gap-2 p-4 h-full w-full">
                                    {children}
                                </div>
                            </div>
                            <SideContent>
                                <SelectedArtist />
                            </SideContent>
                        </div>
                    </div>
                    <MainPlayer />
                </SelectedArtistProvider >
            </SessionProvider >
        </>
    )
}

const Navbar = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
    const defaultStyle = "absolute pointer-events-none z-30 w-full h-full xl:p-6 xl:pl-0 bottom-0 flex flex-col items-center xl:max-w-[400px] xl:sticky xl:max-h-screen";

    return (
        <div className={`${defaultStyle} ${className}`}>
            <div className={`absolute transition-all duration-200 ease-in z-10 inset-0`}></div>
            <div className="sticky z-30 top-0 max-h-screen flex flex-col items-center w-full h-full xl:p-0">
                <div className="w-full h-full xl:h-fit justify-end items-center flex flex-col gap-1 overflow-hidden xl:max-w-[400px]">
                    {children}
                </div>
            </div>
        </div >
    )
}