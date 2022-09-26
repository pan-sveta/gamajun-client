import {DefaultSession, DefaultUser} from "next-auth"

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        isAdmin: boolean,
        accessToken: string,
        accessTokenExpires: number,
        refreshToken: string
    }
}

declare module "next-auth" {

    interface Session {
        isAdmin: boolean,
        accessToken: string,
        user: {
            username: string,
        } & DefaultSession["user"]
    }

    interface User {
        username?: string
            & DefaultUser
    }
}