import { getServerSession, NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import { redirect } from "next/navigation";

const refreshAccessToken = async (token: JWT): Promise<JWT> => {
    try {
        const url = 'https://accounts.spotify.com/api/token';

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: token.refreshToken as string,
                client_id: process.env.SPOTIFY_CLIENT_ID!,
                client_secret: process.env.SPOTIFY_CLIENT_SECRET!,
            }),
        });

        const refreshedTokens = await response.json();

        if (!response.ok) {
            throw refreshedTokens;
        }

        return {
            ...token,
            accessToken: refreshedTokens.access_token,
            accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
            refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
        };
    } catch (error) {
        console.error('Error refreshing access token:', error);

        return {
            ...token,
            error: 'RefreshAccessTokenError',
        };
    }
};

export const authOptions: NextAuthOptions = {
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID!,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
            authorization: {
                params: {
                    scope: 'user-read-email user-read-private user-top-read',
                },
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, account, user }): Promise<JWT> {
            if (account && user) {
                return {
                    ...token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    accessTokenExpires: account.expires_at ? account.expires_at * 1000 : 0,
                };
            }

            if (Date.now() < (token.accessTokenExpires as number) ?? 0) {
                return token;
            }

            return refreshAccessToken(token);
        },
        async session({ session, token }): Promise<Session> {
            session.accessToken = token.accessToken;
            session.error = token.error;
            session.refreshToken = token.refreshToken;

            return session;
        },
    },
};

export const getSession = () => getServerSession(authOptions);
