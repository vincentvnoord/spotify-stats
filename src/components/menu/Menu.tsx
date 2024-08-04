import Image from "next/image";
import { User } from "../user/User";
import NavElement from "./NavElement";
import { getTopArtists, getTopTracks } from "@/lib/spotify";
import { getSession } from "@/auth";

async function Menu() {
    const session = await getSession();
    const topArtists = await getTopArtists(session?.accessToken as string, "long_term", 10);
    const topTracks = await getTopTracks(session?.accessToken as string, "long_term", 10);
    const randomNumber = Math.floor(Math.random() * topArtists.length);
    const randomGenre = randomNumber + 1 > topTracks.length ? 0 : randomNumber + 1;

    return (
        <div className="w-full flex gap-3 flex-col">
            <User />
            <div>
                <p className="text-lg font-bold p-2">Top</p>
                <nav className="grid gap-2 grid-cols-2 grid-rows-2">
                    <NavElement href="/tracks" image={topTracks[randomNumber].image} className="row-span-2">
                        SONGS
                    </NavElement>

                    <NavElement href="/artists" image={topArtists[randomNumber].image}>
                        ARTISTS
                    </NavElement>

                    <NavElement href="/genres" image={topTracks[randomGenre].image}>
                        GENRES
                    </NavElement>
                </nav>
            </div>

        </div>
    )
}

export default Menu;