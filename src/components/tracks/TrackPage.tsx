"use client";

import { SessionProvider } from "next-auth/react";

export const TrackPage = ({ children }: { children: React.ReactNode }) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}