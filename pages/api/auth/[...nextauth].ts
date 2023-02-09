import NextAuth, {NextAuthOptions} from "next-auth"
import {btoa} from "buffer";
import {isUserAdmin} from "../../../services/admin";
import {JWT} from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        {
            id: "gamajun",
            name: "Gamajun",
            type: "oauth",
            wellKnown: "https://gamajun-api.stepanek.app/.well-known/openid-configuration",
            clientSecret: process.env.CTU_CLIENT_SECRET,
            clientId: process.env.CTU_CLIENT_ID,
            async profile(profile, tokens) {
                console.log("PROFILE")
                console.log(profile)
                console.log(tokens)
                return {
                    id: profile.username,
                    name: profile.name,
                    username: profile.username,
                    email: profile.email,
                    image: `https://avatars.dicebear.com/api/pixel-art/${profile.username}.svg`,
                }
            },
        }
    ],
    pages: {
        signIn: '/auth/signin',
    }
}

export default NextAuth(authOptions);