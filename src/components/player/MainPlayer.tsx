"use client";

import { useEffect } from "react";
import { usePlaybackState, usePlayerDevice, useSpotifyPlayer, useWebPlaybackSDKReady } from "react-spotify-web-playback-sdk"

export default function MainPlayer() {
    const playbackState = usePlaybackState();
    const webPlaybackSDKReady = useWebPlaybackSDKReady();
    const device = usePlayerDevice();
    const player = useSpotifyPlayer();
    console.log(player);

    useEffect(() => {
        if (webPlaybackSDKReady && player) {
            player.connect().then((success) => {
                if (success) {
                    console.log("The Web Playback SDK successfully connected to Spotify!");
                }

            }).catch((error) => {
                console.error("The Web Playback SDK could not connect to Spotify:", error);
            });

            player.resume().then(() => {
                console.log("Playback started!");
            }).catch((error) => {
                console.error("Failed to start playback:", error);
            });
        }
    }, [player, webPlaybackSDKReady]);

    return (
        <div className="w-full flex justify-between p-2 pt-0">
            <div>
                <p>{playbackState?.track_window.current_track.name}</p>
                <p>Current artist</p>
            </div>
            <div>
                <h1>Player</h1>
            </div>
            <div>
                <p>Actions</p>
            </div>
        </div>
    )
}