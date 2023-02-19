import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client";

const httpLink = createHttpLink({
    uri: 'https://gamajun-api.stepanek.app/graphql',
});

export const gamajunApolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

export default gamajunApolloClient