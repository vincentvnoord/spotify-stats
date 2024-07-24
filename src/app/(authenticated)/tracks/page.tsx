import React from "react";
import Image from "next/image";
import { TimeFrameButton } from "@/components/ui/Buttons";
import { getSession } from "@/auth";
import { redirect } from "next/navigation";
import { TrackList } from "@/components/tracks/TrackList";
import { TrackPage } from "@/components/tracks/TrackPage";


export default async function TracksPage({ searchParams }: { searchParams: { timeRange?: string } }) {
    const session = await getSession();
    if (!session) {
        redirect("/");
    }

    return (
        <main className="w-full relative h-full flex flex-col gap-3 p-3 lg:min-w-[1024px]">
            <div className="sticky z-10 bg-background p-3 rounded-lg top-0 flex-col-reverse gap-4 flex md:flex-row items-center justify-between">
                <div className="flex gap-2">
                    <TimeFrameButton timeFrame="short_term">latest</TimeFrameButton>
                    <TimeFrameButton timeFrame="medium_term">6 months</TimeFrameButton>
                    <TimeFrameButton timeFrame="long_term">1 year</TimeFrameButton>
                </div>
                <h1 className="text-primary flex gap-3 text-4xl font-extrabold"><p className="text-white">TOP</p>TRACKS</h1>
            </div>

            <div className="h-0.5 w-full bg-secondary"></div>

            <TrackPage>
                <TrackList />
            </TrackPage>
        </main>
    );
}
