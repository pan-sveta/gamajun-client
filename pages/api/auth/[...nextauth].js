import NextAuth from "next-auth"
import AppleProvider from "next-auth/providers/apple";

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
            clientSecret: "Q5vSQeBcPjetzBkLqd0W9v6RStKr1gS2",
            clientId: "c8e3af38-4b9c-412c-a9f8-da70d5f0c407",
            idToken: false,
            profile(profile) {
                console.log(profile)
                return {
                    id: profile.username,
                    name: profile.username,
                    email: profile.email,
                }
            },
        }
    ],
    callbacks: {
        async jwt({ token, account = {} }) {

            if (account.access_token) {
                token.accessToken = account.access_token;
            }

            if (account.refresh_token) {
                token.accessToken = account.refresh_token;
            }

            return token;
        },
        async session({ session, token, user }) {
            session.user.image = `https://avatars.dicebear.com/api/pixel-art/${session.user.name}.svg`;
            return session;
        },
    },
})