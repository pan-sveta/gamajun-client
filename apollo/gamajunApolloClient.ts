import {ApolloClient, ApolloLink, createHttpLink, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import {getSession, signOut} from "next-auth/react";
import {onError} from "@apollo/client/link/error";

const httpLink = createHttpLink({
    uri: `${process.env.NEXT_PUBLIC_GAMAJUN_API_URL}/graphql`,
});

const authLink = setContext(async (_, {headers}) => {
    const session = await getSession();
    const token = session?.accessToken;

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

export const gamajunApolloClient = new ApolloClient({
    link: ApolloLink.from([
        onError(({networkError, graphQLErrors}) => {
            if (networkError?.message.includes("401")) {
                signOut().then(() => window.location.href = '/');
            }
        }),
        authLink.concat(httpLink)
    ]),
    cache: new InMemoryCache()
});

export default gamajunApolloClient