
import { useState } from "react";
import SelectedArtistContext from "./SelectedArtistContext";
import { FullArtistInfo } from "@/types/spotify";

const SelectedArtistProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedArtist, setSelectedArtist] = useState<string | null>(null);

    return (
        <SelectedArtistContext.Provider value={{ selectedArtist, setSelectedArtist }}>
            {children}
        </SelectedArtistContext.Provider>
    )
}

export default SelectedArtistProvider;