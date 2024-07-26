import React from "react";
import Image from "next/image";
import { getSession } from "@/auth";
import { redirect } from "next/navigation";
import { TrackList } from "@/components/tracks/TrackList";
import { SessionPage } from "@/components/SessionPage";
import { PageHeader } from "@/components/PageHeader";
import { MainContent } from "@/components/ui/Containers";


export default async function TracksPage({ searchParams }: { searchParams: { timeRange?: string } }) {
    const session = await getSession();
    if (!session) {
        redirect("/");
    }

    return (
        <main className="w-full relative h-full flex justify-center gap-3 p-3">
            <MainContent>
                <PageHeader title="TRACKS" />
                <div className="h-0.5 w-full bg-secondary"></div>

                <SessionPage>
                    <TrackList />
                </SessionPage>
            </MainContent>
        </main>
    );
}
