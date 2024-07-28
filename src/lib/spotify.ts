import { UserProps } from "@/components/header/User";
import { BasicTrackInfo, BasicArtistInfo, FullArtistInfo } from "@/types/spotify";

export const spotifyAPI = "https://api.spotify.com/v1";

export const getSpotifyClientID = () => {
    console.log(process.env.SPOTIFY_CLIENT_ID);
    return process.env.SPOTIFY_CLIENT_ID;
}

export const getSpotifyClientSecret = () => {
    console.log(process.env.SPOTIFY_CLIENT_SECRET);
    return process.env.SPOTIFY_CLIENT_SECRET;
}

export async function getUserData(accessToken: string): Promise<UserProps> {
    const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    if (response.ok) {
        const data = await response.json();
        return {
            display_name: data.display_name,
            images: data.images,
        }
    }

    return response.json();
}

export async function getTopTracks(accessToken: string, timeRange: string): Promise<BasicTrackInfo[]> {
    const response = await fetch(`${spotifyAPI}/me/top/tracks?time_range=${timeRange}&limit=50`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    let tracks: BasicTrackInfo[] = [];

    if (response.ok) {
        const data = await response.json();
        console.log(data);
        tracks = data.items.map((track: any, index: number) => {
            return {
                name: track.name,
                ranking: index + 1,
                artists: track.artists,
                image: track.album.images[0].url,
                public_url: track.external_urls.spotify
            }
        });
    }

    return tracks;
}


export async function getTopArtists(accessToken: string, timeRange: string): Promise<BasicArtistInfo[]> {
    const response = await fetch(`${spotifyAPI}/me/top/artists?time_range=${timeRange}&limit=50`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    let artists: BasicArtistInfo[] = [];

    if (response.ok) {
        const data = await response.json();
        artists = data.items.map((artist: any, index: number) => {
            return {
                id: artist.id,
                name: artist.name,
                ranking: index + 1,
                image: artist.images[0].url,
                public_url: artist.external_urls.spotify
            }
        });
    }

    return artists;
}

export async function getArtistData(accessToken: string, id: string): Promise<FullArtistInfo | null> {
    let topTracks: BasicTrackInfo[] = []

    const topTracksRes = await fetch(`${spotifyAPI}/artists/${id}/top-tracks?market=US`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    if (topTracksRes.ok) {
        const data = await topTracksRes.json();
        topTracks = data.tracks.map((track: any, index: number) => {
            return {
                name: track.name,
                ranking: index + 1,
                artists: track.artists,
                image: track.album.images[0].url,
                public_url: track.external_urls.spotify
            }
        });
    }

    const basicData = await fetch(`${spotifyAPI}/artists/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    let artist: FullArtistInfo | null = null;

    if (basicData.ok) {
        const data = await basicData.json();
        artist = {
            id: data.id,
            name: data.name,
            images: data.images,
            followers: data.followers.total,
            topTracks: topTracks
        };

    }

    return artist;
}