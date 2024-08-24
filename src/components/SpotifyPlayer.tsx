"use client";

import React, { useCallback } from "react"
import { WebPlaybackSDK } from "react-spotify-web-playback-sdk"

export const SpotifyPlayer = ({ token, children }: { token: string, children: React.ReactNode }) => {
    const getOAuthToken = useCallback((callback: (arg0: string) => any) => callback(token), []);

    return (
        <WebPlaybackSDK
            initialDeviceName="Device"
            getOAuthToken={getOAuthToken}
            initialVolume={0.5}
            connectOnInitialized={true}
        >
            {children}
        </WebPlaybackSDK>
    )
}