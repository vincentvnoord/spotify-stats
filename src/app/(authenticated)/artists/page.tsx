import React from "react";
import { getSession } from "@/auth";
import { redirect } from "next/navigation";
import ArtistsPage from "@/components/artists/ArtistsPage";


export default async function Artists({ searchParams }: { searchParams: { timeRange?: string } }) {
    const session = await getSession();
    if (!session || !session.accessToken) {
        redirect("/");
    }

    return (
        <main className="w-full relative h-full flex justify-center gap-3">
            <ArtistsPage />
        </main>
    );
}
