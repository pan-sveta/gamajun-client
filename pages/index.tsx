import type {NextPage} from 'next'
import {useSession} from "next-auth/react";
import {Avatar, Badge, Center, Flex, Paper, Stack, Text, Title, Tooltip} from "@mantine/core";
import React from "react";
import Head from "next/head";

const Home: NextPage = () => {
    const {data: session} = useSession();

    return (
        <div>
            <Head>
                <title>Domovská stánka | Gamajun</title>
            </Head>
            <Title order={1}>Vítejte v testovacím systému Gamajun</Title>
            <Center>
                <Paper shadow="xs" p="md" my={"md"} w={"15vw"} withBorder>
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
