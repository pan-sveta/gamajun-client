import NextAuth, {NextAuthOptions} from "next-auth"
import {btoa} from "buffer";
import {isUserAdmin} from "../../../services/admin";
import {JWT} from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
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

        async jwt({token, user, account}): Promise<JWT> {
            // Initial sign in
            if (account && user) {
                const x: boolean = await isUserAdmin(user.username || "N/A", account.access_token || "N/A");
                return {
                    accessToken: account.access_token,
                    accessTokenExpires: account.expires_at ? account.expires_at * 1000 : account.expires_at,
                    refreshToken: account.refresh_token,
                    isAdmin: x,
                    user,
                }
            }

            console.log(token.accessTokenExpires)
            console.log(Date.now())
            if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
                return token;
            }

            return refreshAccessToken(token)
        },
        async session({session, token}) {
            session.user = token.user
            session.isAdmin = token.isAdmin
            session.accessToken = token.accessToken
            //session.error = token.error

            return session
        },
    },
    pages: {
        signIn: '/auth/signin',
    }
}

export default NextAuth(authOptions);

async function refreshAccessToken(token: any): Promise<JWT> {
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
            accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
            refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
        }
    } catch (error) {
        return {
            ...token,
            error: "RefreshAccessTokenError",
        }
    }
}

async function fetchUserMap(username: string, token: string): Promise<UserMapResponse> {
    const url = `https://kosapi.fit.cvut.cz/usermap/v1/people/${username}`;

    return fetch(url, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        method: "GET",
    }).then((response) => {
            if (!response.ok) {
                throw new Error("Username fetch failed: HTTP " + response.status);
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