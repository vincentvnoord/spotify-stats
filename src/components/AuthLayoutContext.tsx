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
                        <div className="flex w-full flex-col gap-4 md:p-6">
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
    const defaultStyle = "absolute h-full z-30 w-full xl:p-6 xl:pl-0 top-0 flex flex-col items-center xl:max-w-[400px] xl:sticky xl:max-h-screen";

    return (
        <div className={`${defaultStyle} ${className}`}>
            <div className={`absolute transition-all duration-200 ease-in z-10 inset-0`}></div>
            <div className="sticky z-30 top-0 p-3 max-h-screen flex flex-col items-center w-full h-full xl:p-0">
                <div className="rounded-2xl p-3 w-full items-start flex flex-col bg-background overflow-hidden max-w-[600px] xl:max-w-[400px]">
                    {children}
                </div>
            </div>
        </div >
    )
}