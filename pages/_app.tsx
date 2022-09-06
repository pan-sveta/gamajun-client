import type {AppProps} from 'next/app'
import {ColorScheme, ColorSchemeProvider, MantineProvider} from "@mantine/core";
import GamajunAppShell from "../components/appshell/GamajunAppShell";
import {useState} from "react";

function MyApp({Component, pageProps}: AppProps) {
    //Mantine color scheme
    const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider withGlobalStyles withNormalizeCSS theme={{colorScheme: colorScheme}}>
                <GamajunAppShell>
                    <Component {...pageProps} />
                </GamajunAppShell>
            </MantineProvider>
        </ColorSchemeProvider>
    )
}

export default MyApp
