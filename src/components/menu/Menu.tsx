import Image from "next/image";
import { User } from "../user/User";
import NavElement from "./NavElement";
import { getTopArtists, getTopTracks } from "@/lib/spotify";
import { getSession } from "@/auth";
import { BarChartIcon, MenuIcon } from "lucide-react";
import { ClientMenu } from "./ClientMenu";

async function Menu() {
    const session = await getSession();
    const topArtists = await getTopArtists(session?.accessToken as string, "long_term", 10);
    const topTracks = await getTopTracks(session?.accessToken as string, "long_term", 10);
    const randomNumber = Math.floor(Math.random() * topArtists.length);
    const randomGenre = randomNumber + 1 >= topTracks.length ? 0 : randomNumber + 1;
    const images = [topTracks[randomNumber].image, topArtists[randomNumber].image, topTracks[randomGenre].image];

    return (
        <ClientMenu images={images} userUI={<User />} />
    )
}

export default Menu;