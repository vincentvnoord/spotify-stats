import Menu from "@/components/menu/Menu";
import { getSession } from "@/auth";
import { getUserData, getTopArtists, getTopTracks } from "@/lib/spotify";
import Link from "next/link";
import { ArtistCard } from "@/components/artists/ArtistCard";
import { TrackCard } from "@/components/tracks/TrackList";
import { FavoriteArtist, FavoriteGenres, FavoriteTrack } from "@/components/dashboard/Top";
import { LinkedSection } from "@/components/dashboard/LinkedSection";

export default async function Dashboard() {
    const session = await getSession();
    const user = await getUserData(session?.accessToken as string);

    const topArtists = await getTopArtists(session?.accessToken as string, "short_term", 3);
    const topTracks = await getTopTracks(session?.accessToken as string, "short_term", 3);

    return (
        <>
            <h1 className="text-3xl font-extrabold">Welcome, {user.display_name}</h1>
            <div className="w-full grid md:grid-cols-2 grid-rows-2 gap-2">
                <LinkedSection title="Your Favorite Artists" href="/artists">
                    <GalleryContainer>
                        {topArtists.map((artist) => (
                            <FavoriteArtist key={artist.id} artist={artist}
                                className={`${artist.ranking > 3 && "hidden xl:flex"} ${artist.ranking === 3 && "hidden md:flex"} ${artist.ranking >= 4 && artist.ranking <= 5 ? "hidden lg:flex" : ""}`}
                            />
                        ))}
                    </GalleryContainer>
                </LinkedSection>

                <LinkedSection title="Your Favorite Genres" href="/genres" className="row-span-2">
                    <FavoriteGenres />
                </LinkedSection>

                <LinkedSection title="Your Favorite Tracks" href="/tracks">
                    <GalleryContainer>
                        {topTracks.map((track) => (
                            <FavoriteTrack key={track.public_url} artist={track}
                                className={`${track.ranking > 3 && "hidden xl:flex"} ${track.ranking === 3 && "hidden md:flex"} ${track.ranking >= 4 && track.ranking <= 5 ? "hidden lg:flex" : ""}`}
                            />
                        ))}
                    </GalleryContainer>
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
