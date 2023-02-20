import NextAuth, {NextAuthOptions} from "next-auth"
import {btoa} from "buffer";
import {JWT} from "next-auth/jwt";
import React from "react";

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        {
            id: "gamajun",
            name: "Gamajun",
            type: "oauth",
            wellKnown: `${process.env.NEXT_PUBLIC_GAMAJUN_API_URL}/.well-known/openid-configuration`,
            clientSecret: process.env.GAMAJUN_CLIENT_SECRET,
            clientId: process.env.GAMAJUN_CLIENT_ID,
            idToken: true,
            async profile(profile, tokens) {
                console.log("PRof")
                console.log(profile)

                return {
                    id: profile.sub,
                    name: `${profile.name} ${profile.family_name}`,
                    username: profile.sub,
                    email: profile.email,
                    image: profile.picture,
                    roles: profile.roles
                }
            },
        }
    ],
    callbacks: {
        async jwt({token, user, account}): Promise<JWT> {
            /*console.log("TOUKN")
            console.log(token)
            console.log(user)
            console.log(account)*/

            // Initial sign in
            if (account && user) {
                return {
                    accessToken: account.access_token ?? "" ,
                    accessTokenExpires: account.expires_at ? Date.now() + account.expires_at * 1000 : -1,
                    refreshToken: account.refresh_token ?? "",
                    user,
                }
            }

            // Return previous token if the access token has not expired yet
            if (Date.now() < token.accessTokenExpires) {
                return token
            }

            // Access token has expired, try to update it
            return refreshAccessToken(token);
        },
        async session({session, token}) {
            session.user = token.user
            session.accessToken = token.accessToken
            //session.error = token.error

            return session
        },
    },
    pages: {
        signIn: '/auth/signin',
    }
}

async function refreshAccessToken(token: JWT) {
    console.log("Refreshing token")

    try {
        const params = new URLSearchParams({
            client_id: process.env.GAMAJUN_CLIENT_ID ?? "",
            client_secret: process.env.GAMAJUN_CLIENT_SECRET ?? "",
            grant_type: "refresh_token",
            refresh_token: token.refreshToken,
        });

        // @ts-ignore
        const url = `${process.env.NEXT_PUBLIC_GAMAJUN_API_URL}/oauth2/token?${params}`;


        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Basic ${btoa(`${process.env.GAMAJUN_CLIENT_ID}:${process.env.GAMAJUN_CLIENT_SECRET}`)}`
            },
            method: "POST",
        })

        const refreshedTokens = await response.json()

        if (!response.ok) {
            throw refreshedTokens;
        }

        return {
            ...token,
            accessToken: refreshedTokens.access_token,
            accessTokenExpires: Date.now() + refreshedTokens.expires_at * 1000,
            refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
        }

    } catch (error) {
        console.log(error)

        return {
            ...token,
            error: "RefreshAccessTokenError",
        }
    }
}

export default NextAuth(authOptions);