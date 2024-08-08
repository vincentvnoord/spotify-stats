"use client";

import SelectedArtistProvider from "@/components/artists/SelectedArtistProvider";
import { SideContent } from "@/components/artists/ArtistsPage";
import { MainContent } from "@/components/ui/Containers";
import { SelectedArtist } from "@/components/artists/SelectedArtist";
import { SessionProvider } from "next-auth/react";


export default function AuthLayoutContext({ children, menu }: { children: React.ReactNode, menu: React.ReactNode }) {
    return (
        <>
            <SessionProvider>
                <SelectedArtistProvider>
                    <Navbar className="xl:pl-6 xl:pr-0" >
                        {menu}
                    </Navbar>
                    <MainContent>
                        <div className="flex w-full h-full flex-col gap-4 md:p-6">
                            {children}
                        </div>
                    </MainContent>

                    <SideContent>
                        <SelectedArtist />
                    </SideContent>
                </SelectedArtistProvider >
            </SessionProvider>
        </>
    )
}

const Navbar = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
    const defaultStyle = "absolute top-0 pointer-events-none z-30 w-full h-dvh xl:p-6 xl:pl-0 bottom-0 flex flex-col items-center xl:max-w-[400px] xl:sticky xl:max-h-screen";

    return (
        <div className={`${defaultStyle} ${className}`}>
            <div className={`absolute transition-all duration-200 ease-in z-10 inset-0`}></div>
            <div className="absolute z-30 top-0 flex flex-col items-center w-full h-full xl:p-0">
                <div className="w-full h-dvh xl:h-fit justify-end items-center flex flex-col gap-1 overflow-hidden xl:max-w-[400px]">
                    {children}
                </div>
            </div>
        </div >
    )
}