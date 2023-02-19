import {DefaultSession, DefaultUser, User} from "next-auth"



declare module "next-auth" {

    interface Session {
        accessToken: string
        & DefaultSession["user"]
    }

    interface User {
        username: string
        roles: Array<string>
            & DefaultUser
    }
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        accessToken: string,
        accessTokenExpires: number,
        refreshToken: string
        user: User
    }
}