import React from "react";
import { getSession } from "@/auth";
import { redirect } from "next/navigation";
import ArtistsPage from "@/components/artists/ArtistsPage";
import { getUserData } from "@/lib/spotify";


export default async function Artists({ searchParams }: { searchParams: { timeRange?: string } }) {
    const session = await getSession();
    if (!session || !session.accessToken) {
        redirect("/");
    }

    const user = await getUserData(session.accessToken);

    return (
        <main className="w-full relative h-full flex justify-center">
            <ArtistsPage user={user} />
        </main>
    );
}
