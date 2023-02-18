import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import {getSession} from "next-auth/react";

const httpLink = createHttpLink({
    uri: 'http://127.0.0.1:8080/graphql',
});

const authLink = setContext(async (_, { headers }) => {
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
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default gamajunApolloClient