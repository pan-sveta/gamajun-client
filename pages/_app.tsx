import type {AppProps} from 'next/app'
import {ColorScheme, ColorSchemeProvider, MantineProvider} from "@mantine/core";
import GamajunAppShell from "../components/appshell/GamajunAppShell";
import {useState} from "react";
import {getSession, SessionProvider} from "next-auth/react";
import {NotificationsProvider} from "@mantine/notifications";
import {ModalsProvider} from "@mantine/modals";
import {RouterTransition} from "../components/appshell/RouterTransition";
import {ApolloClient, ApolloProvider, createHttpLink, from, InMemoryCache} from "@apollo/client";
import gamajunApolloClient from "../gamajunApolloClient";

import 'dayjs/locale/cs';

function MyApp({Component, pageProps: {session, ...pageProps}}: AppProps) {
    //Mantine color scheme
    const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    return (
        <SessionProvider session={session}>
            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                <MantineProvider withGlobalStyles withNormalizeCSS theme={{colorScheme: colorScheme}}>
                    <NotificationsProvider>
                        <ModalsProvider>
                            <ApolloProvider client={gamajunApolloClient}>
                                <RouterTransition/>
                                <GamajunAppShell>
                                    <Component {...pageProps} />
                                </GamajunAppShell>
                            </ApolloProvider>
                        </ModalsProvider>
                    </NotificationsProvider>
                </MantineProvider>
            </ColorSchemeProvider>
        </SessionProvider>
    )
}

export default MyApp
