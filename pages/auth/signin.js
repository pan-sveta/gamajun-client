import {getProviders, signIn} from "next-auth/react"
import {Button, Stack, Title} from "@mantine/core";
import {IconLogin, IconUserPlus} from "@tabler/icons";
import Image from "next/image";
import React from "react";
import {useRouter} from "next/router";
import Head from "next/head";

export default function SignIn({providers}) {
    const router = useRouter();

    return (
        <div style={{
            backgroundImage: "url(/graduation.svg)",
            backgroundSize: "contain",
            backgroundPositionY: "bottom",
            backgroundRepeat: "no-repeat",
            height: "100vh",
            width: "100vw",
            position: "absolute"
        }}>
            <Head>
                <title>Přihlásit se | Gamajun</title>
            </Head>
            <Stack align={"center"} justify={"center"} shadow={"xl"} mt={"20vh"} style={{zIndex: 1}}>
                <Image alt={"Gamajun logo"} src={"/logo.png"} height={112} width={400} quality={100}/>
                <Title order={1} ta={"center"}>Vítejte v testovacím systému Gamajun</Title>
                {Object.values(providers).map((provider) => (
                    <div key={provider.name}>
                        <Button onClick={() => signIn(provider.id, {redirect: true, callbackUrl: "/"})}
                                leftIcon={<IconLogin/>}>
                            Přihlásit se
                        </Button>
                    </div>
                ))}

                <Button color={"green"} onClick={() => router.push("/auth/register")} leftIcon={<IconUserPlus/>}>
                    Zaregistrovat se
                </Button>
            </Stack>
        </div>
    )
}

export async function getServerSideProps(context) {
    const providers = await getProviders()
    return {
        props: {providers},
    }
}