import type {NextPage} from 'next'
import {useSession} from "next-auth/react";
import {Avatar, Badge, Center, createStyles, Flex, Paper, Stack, Text, Title, Tooltip} from "@mantine/core";
import React from "react";
import Head from "next/head";

const useStyles = createStyles((theme) => ({
    bgImage: {
        backgroundImage: "url('/home.svg')",
        minHeight: "100%",
        backgroundRepeat:"no-repeat",
        backgroundSize: "57%",
        backgroundPositionX: "center",
        backgroundPositionY: "bottom"
    }
}));


const Home: NextPage = () => {
    const {data: session} = useSession();

    const {classes} = useStyles();

    return (
        <div className={classes.bgImage}>
            <Head>
                <title>Domovská stánka | Gamajun</title>
            </Head>
            <Title ta={"center"} order={1}>Vítejte v testovacím systému Gamajun</Title>
            <Center>
                <Paper shadow="xs" px="xl" py="md" my={"md"} miw={"15vw"} withBorder>
                    <Stack spacing={"sm"} align={"center"}>
                        <Avatar src={session?.user?.image}/>
                        <div>
                            <Title order={3} ta={"center"}>{session?.user?.name}</Title>
                            <Text ta={"center"}>{session?.user?.email}</Text>
                        </div>
                        <Flex align={"center"}>
                            <Text mr={"sm"}>Role:</Text>
                            {
                                // @ts-ignore
                                session?.user?.roles?.includes("GAMAJUN_TEACHER") ?
                                <Tooltip label={"Můžete spravovat zkoušky, zadání a třídy"}>
                                    <Badge mr={"xs"} color={"grape"}>Učitel</Badge>
                                </Tooltip> : null
                            }
                            {
                                // @ts-ignore
                                session?.user?.roles?.includes("GAMAJUN_STUDENT") ?
                                <Tooltip label={"Standartní role studenta"}>
                                    <Badge mr={"xs"} color={"green"}>Student</Badge>
                                </Tooltip> : null
                            }
                        </Flex>

                    </Stack>
                </Paper>
            </Center>
        </div>
    )
}

export default Home
