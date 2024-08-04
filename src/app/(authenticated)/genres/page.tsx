import React from "react";
import { getSession } from "@/auth";
import { redirect } from "next/navigation";
import ArtistsPage from "@/components/artists/ArtistsPage";
import { getUserData } from "@/lib/spotify";
import { PageHeader } from "@/components/PageHeader";
import { ArtistsGrid } from "@/components/artists/ArtistList";

export default async function Artists({ searchParams }: { searchParams: { timeRange?: string } }) {
    const session = await getSession();
    if (!session || !session.accessToken) {
        redirect("/");
    }

    return (
        <>
            <h1>GENRES</h1>
        </>
    );
}
