import { createContext } from "react";
import { FullArtistInfo } from "@/types/spotify";

type SelectedArtistContextType = {
    selectedArtist: string | null;
    setSelectedArtist: (artist: string | null) => void;
}

const SelectedArtistContext = createContext<SelectedArtistContextType>({ selectedArtist: null, setSelectedArtist: () => null });
export default SelectedArtistContext;