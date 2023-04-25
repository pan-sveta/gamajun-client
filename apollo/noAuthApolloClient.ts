import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client";

const httpLink = createHttpLink({
    uri: `${process.env.NEXT_PUBLIC_GAMAJUN_API_URL}/graphql`,
});


export const gamajunApolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

export default gamajunApolloClient