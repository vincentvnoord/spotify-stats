"use client";

import SelectedArtistProvider from "@/components/artists/SelectedArtistProvider";
import { SideContent } from "@/components/artists/ArtistsPage";
import { MainContent } from "@/components/ui/Containers";
import { SelectedArtist } from "@/components/artists/SelectedArtist";
import { SessionProvider } from "next-auth/react";
import MainPlayer from "./player/MainPlayer";
import { SpotifyPlayer } from "./SpotifyPlayer";

export default function AuthLayoutContext({ children, header, token }: { children: React.ReactNode, header: React.ReactNode, token: string }) {
    return (
        <>
            <SessionProvider>
                <SpotifyPlayer token={token} >
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
                </SpotifyPlayer>
            </SessionProvider >
        </>
    )
}

const Navbar = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
    const defaultStyle = "absolute left-0 top-0 pointer-events-none z-30 w-full h-dvh xl:p-6 xl:pl-0 flex flex-col items-center xl:max-w-[400px] xl:sticky xl:max-h-screen";

    return (
        <div className={`${defaultStyle} ${className}`}>
            <div className={`absolute transition-all duration-200 ease-in z-10 inset-0`}></div>
            <div className="absolute z-30 top-0 flex flex-col items-center w-full h-full xl:p-0">
                {children}
            </div>
        </div >
    )
}