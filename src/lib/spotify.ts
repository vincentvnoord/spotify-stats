import { BasicTrackInfo, BasicArtistInfo } from "@/types/spotify";

export const login = () => {
    const scope = "user-read-private user-read-email";
    const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
}

export const getSpotifyClientID = () => {
    console.log(process.env.SPOTIFY_CLIENT_ID);
    return process.env.SPOTIFY_CLIENT_ID;
}

export const getSpotifyClientSecret = () => {
    console.log(process.env.SPOTIFY_CLIENT_SECRET);
    return process.env.SPOTIFY_CLIENT_SECRET;
}

export async function getUserData(accessToken: string) {
    const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    return response.json();
}

export async function getTopTracks(accessToken: string, timeRange: string): Promise<BasicTrackInfo[]> {
    const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=50`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    let tracks: BasicTrackInfo[] = [];

    if (response.ok) {
        const data = await response.json();
        tracks = data.items.map((track: any, index: number) => {
            return {
                name: track.name,
                ranking: index + 1,
                artists: track.artists,
                image: track.album.images[0].url
            }
        });
    }

    return tracks;
}


export async function getTopArtists(accessToken: string, timeRange: string): Promise<BasicArtistInfo[]> {
    const response = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=50`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    let artists: BasicArtistInfo[] = [];

    if (response.ok) {
        const data = await response.json();
        artists = data.items.map((artist: any, index: number) => {
            return {
                name: artist.name,
                ranking: index + 1,
                image: artist.images[0].url
            }
        });
    }

    return artists;
}