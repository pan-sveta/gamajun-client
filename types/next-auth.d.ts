import NextAuth, {DefaultSession, DefaultUser} from "next-auth"

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        accessToken: string,
        accessTokenExpires: number,
        refreshToken: string
    }
}

declare module "next-auth" {

    interface Session {
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