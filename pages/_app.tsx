import type {AppProps} from 'next/app'
import {ColorScheme, ColorSchemeProvider, MantineProvider} from "@mantine/core";
import GamajunAppShell from "../components/appshell/GamajunAppShell";
import {useState} from "react";
import {SessionProvider} from "next-auth/react";
import {Notifications} from "@mantine/notifications";
import {ModalsProvider} from "@mantine/modals";
import {RouterTransition} from "../components/appshell/RouterTransition";
import {ApolloProvider} from "@apollo/client";
import gamajunApolloClient from "../gamajunApolloClient";

import 'dayjs/locale/cs';
import {useRouter} from "next/router";


// @ts-ignore
function MyApp({Component, pageProps: {session, ...pageProps}}: AppProps) {
    //Mantine color scheme
    const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    //Router for layout removal
    const router = useRouter();

    const layoutRemoval = () => {
        if (router.pathname.includes("/auth"))
            return (
                <Component {...pageProps} />
            );
        else
            return (
                <GamajunAppShell>
                    <Component {...pageProps} />
                </GamajunAppShell>
            );
    }

    return (
        <SessionProvider session={session}>
            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                <MantineProvider withGlobalStyles withNormalizeCSS theme={{colorScheme: colorScheme}}>
                        <ModalsProvider>
                            <ApolloProvider client={gamajunApolloClient}>
                                <Notifications/>
                                <RouterTransition/>
                                {layoutRemoval()}
                            </ApolloProvider>
                        </ModalsProvider>
                </MantineProvider>
            </ColorSchemeProvider>
        </SessionProvider>
    )
}

export default MyApp
