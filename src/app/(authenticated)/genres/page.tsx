import React from "react";
import { getSession } from "@/auth";
import { redirect } from "next/navigation";
import { GenreRank, getTopGenres } from "@/lib/spotify";
import { PageHeader } from "@/components/PageHeader";

export default async function Genres({ searchParams }: { searchParams: { timeRange?: string } }) {
    const session = await getSession();
    if (!session || !session.accessToken) {
        redirect("/");
    }

    const topGenres = searchParams.timeRange ?
        await getTopGenres(session?.accessToken as string, searchParams.timeRange) :
        await getTopGenres(session?.accessToken as string, "short_term");

    return (
        <>
            <PageHeader title="GENRES" />
            <div className="w-full flex justify-center items-center">
                <TopRankingGenre topGenre={topGenres[3]} />
                <TopRankingGenre topGenre={topGenres[1]} />
                <TopRankingGenre topGenre={topGenres[0]} />
                <TopRankingGenre topGenre={topGenres[2]} />
                <TopRankingGenre topGenre={topGenres[4]} />
            </div>
            <div>
                <h1>hello</h1>
            </div>
        </>
    );
}

const TopRankingGenre = ({ topGenre }: { topGenre: GenreRank }) => {
    const { genre, count } = topGenre;

    return (
        <div className="h-full flex items-center justify-center">
            <div className="rounded-full shadow-md bg-primary aspect-square flex items-center justify-center">
                <h1 className="text-4xl text-center max-w-48 font-extralight p-6">
                    {genre}
                </h1>
            </div>
        </div>
    )
}