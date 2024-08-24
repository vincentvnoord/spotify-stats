import { getSession } from "@/auth";
import { getUserData, getTopArtists, getTopTracks, getTopGenres } from "@/lib/spotify";
import { FavoriteGenres, FavoriteTrack, TopTrackHighlight } from "@/components/dashboard/Top";
import { LinkedSection } from "@/components/dashboard/LinkedSection";
import { TopArtistHighlight } from "@/components/dashboard/Top";

export default async function Dashboard() {
    const session = await getSession();
    const user = await getUserData(session?.accessToken as string);

    const topArtists = await getTopArtists(session?.accessToken as string, "short_term", 3);
    const topTracks = await getTopTracks(session?.accessToken as string, "short_term", 3);
    const topGenres = await getTopGenres(session?.accessToken as string, "short_term");

    return (
        <>
            <div className="w-full min-h-full grid grid-cols-1 md:grid-cols-3 grid-rows-4 md:grid-rows-2 gap-2">
                <div className="p-2 bg-black rounded-lg">
                    <h1 className="text-3xl font-bold overflow-hidden">
                        Welcome,
                        <span className="text-primary">
                            {user.display_name}
                        </span>
                    </h1>
                    <p className="text-secondary">Your daily summary</p>
                </div>

                <LinkedSection title="Your Favorite Artists" href="/artists" className="md:col-span-2">
                    <div className="flex w-full h-full justify-center items-center">
                        <TopArtistHighlight artist={topArtists[1]} />
                        <TopArtistHighlight artist={topArtists[0]} />
                        <TopArtistHighlight artist={topArtists[2]} />
                    </div>
                </LinkedSection>


                <LinkedSection title="Your Favorite Tracks" href="/tracks" className="md:col-span-2">
                    <div className="flex w-full h-full justify-center items-center">
                        <TopTrackHighlight track={topTracks[1]} />
                        <TopTrackHighlight track={topTracks[0]} />
                        <TopTrackHighlight track={topTracks[2]} />
                    </div>
                </LinkedSection>

                <LinkedSection title="Your Favorite Genres" href="/genres" className="flex-grow">
                    <FavoriteGenres topGenres={topGenres} />
                </LinkedSection>
            </div>
        </>
    )
}

const GalleryContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {children}
        </div>
    )
}
