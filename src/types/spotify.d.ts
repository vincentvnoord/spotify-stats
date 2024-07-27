
export type BasicTrackInfo = {
    name: string;
    ranking: number;
    artists: { name: string }[];
    image: string;
    public_url: string;
}

export type BasicArtistInfo = {
    id: string;
    name: string;
    ranking: number;
    image: string;
    public_url: string;
}

export type FullArtistInfo = {
    id: string;
    name: string;
    images: { url: string }[];
    followers: number;
    topTracks: BasicTrackInfo[];
}