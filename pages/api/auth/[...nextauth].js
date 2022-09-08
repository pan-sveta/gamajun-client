import NextAuth from "next-auth"
import AppleProvider from "next-auth/providers/apple";
import {btoa} from "buffer";

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        {
            id: "ctu",
            name: "ČVUT",
            type: "oauth",
            authorization: {
                url: "https://auth.fit.cvut.cz/oauth/authorize",
                params: {
                    scope: "cvut:cpages:common:read"
                }

            },
            token: "https://auth.fit.cvut.cz/oauth/token",
            userinfo: "https://auth.fit.cvut.cz/oauth/userinfo",
            clientSecret: process.env.CTU_CLIENT_SECRET,
            clientId: process.env.CTU_CLIENT_ID,
            idToken: false,
            profile(profile) {
                return {
                    id: profile.username,
                    name: profile.username,
                    email: profile.email,
                    picture: `https://avatars.dicebear.com/api/pixel-art/${profile.username}.svg`
                }
            },
        }
    ],
    callbacks: {
        async jwt({token, user, account}) {
            console.log("XX")
            console.log(token)
            console.log(user)
            console.log(account)
            // Initial sign in
            if (account && user) {
                return {
                    accessToken: account.access_token,
                    accessTokenExpires: Date.now() + account.expires_at * 1000,
                    refreshToken: account.refresh_token,
                    user,
                }
            }

            // Return previous token if the access token has not expired yet
            if (Date.now() < token.accessTokenExpires) {
                return token
            }

            // Access token has expired, try to update it
            return refreshAccessToken(token)
        },
        async session({session, token}) {
            session.user = token.user
            session.accessToken = token.accessToken
            session.error = token.error

            return session
        },
    },
    secret: process.env.NEXT_PUBLIC_SECRET,
    pages: {
        signIn: '/auth/signin',
    }
})

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token) {
    try {
        console.log("REFRESHING")

        const url = "https://auth.fit.cvut.cz/oauth/token";

        const response = await fetch(url, {
            headers: {
                "Authorization": `Basic ${btoa(`${process.env.CTU_CLIENT_ID}:${process.env.CTU_CLIENT_SECRET}`)}`,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `grant_type=refresh_token&refresh_token=${token.refreshToken}`,
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