import NextAuth from "next-auth"
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
                    scope: "urn:ctu:oauth:umapi.read cvut:umapi:read"
                }

            },
            token: "https://auth.fit.cvut.cz/oauth/token",
            userinfo: "https://auth.fit.cvut.cz/oauth/userinfo",
            clientSecret: process.env.CTU_CLIENT_SECRET,
            clientId: process.env.CTU_CLIENT_ID,
            idToken: false,
            async profile(profile, tokens) {
                let userMap = await fetchUserMap(profile.username, tokens.access_token || "NO TOKEN");
                //let photo = await fetchUserPhoto(profile.username, tokens.token_type || "NO TOKEN");
                //console.log(photo)

                return {
                    id: profile.username,
                    name: userMap.fullName,
                    username: profile.username,
                    email: profile.email,
                    image: `https://avatars.dicebear.com/api/pixel-art/${profile.username}.svg`,
                }
            },
        }
    ],
    callbacks: {

        async jwt({token, user, account}) {
            // Initial sign in
            if (account && user) {
                return {
                    accessToken: account.access_token,
                    accessTokenExpires: account.expires_at ? account.expires_at * 1000 : account.expires_at,
                    refreshToken: account.refresh_token,
                    user,
                }
            }

            console.log(Date.now())
            console.log(token.accessTokenExpires)

            if (Date.now() < token.accessTokenExpires) {
                return token
            }

            // Access token has expired, try to update it
            return refreshAccessToken(token)
        },
        async session({session, token}) {
            // TODO: FIX?
            // @ts-ignore
            session.user = token.user
            session.accessToken = token.accessToken
            session.error = token.error

            return session
        },
    },
    pages: {
        signIn: '/auth/signin',
    }
})

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token: any) {
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

async function fetchUserMap(username: string, token: string): Promise<UserMapResponse> {

    console.log("Fetching user amn")

    const url = `https://kosapi.fit.cvut.cz/usermap/v1/people/${username}`;

    return fetch(url, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        method: "GET",
    }).then((response) => {
            if (!response.ok) {
                throw new Error("Userman fetch failed: HTTP " + response.status);
            }

            return response.json();
        }
    )
}

async function fetchUserPhoto(username: string, token: string): Promise<Blob> {

    const url = `https://kosapi.fit.cvut.cz/usermap/v1/people/${username}/photo`;

    return fetch(url, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "image/png",
            "Content-type": "image/png",
        },
        method: "GET",
    }).then((response) => {
            if (!response.ok) {
                throw new Error("User profile image fetch failed: HTTP " + response.status);
            }

            return response.blob();
        }
    )
}

interface UserMapResponse {
    "username": string,
    "personalNumber": number,
    "kosPersonId": number,
    "firstName": string,
    "lastName": string,
    "fullName": string,
    "emails": Array<string>,
    "preferredEmail": string,
    "departments": Array<Department>,
    "rooms": Array<string>,
    "phones": Array<string>,
    "roles": Array<string>,
    "technicalRoles": Array<string>
}

interface Department {
    "code": number,
    "nameCs": String,
    "nameEn": String
}