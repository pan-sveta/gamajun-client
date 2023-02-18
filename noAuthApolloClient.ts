import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import {getSession} from "next-auth/react";

const httpLink = createHttpLink({
    uri: 'http://127.0.0.1:8080/graphql',
});

export const gamajunApolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

export default gamajunApolloClient