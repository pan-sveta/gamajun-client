import {getProviders, signIn} from "next-auth/react"
import {Button, Paper, Stack, Title} from "@mantine/core";
import {IconLogin, IconSchool, IconUserPlus} from "@tabler/icons";
import Image from "next/image";
import React from "react";
import {useRouter} from "next/router";

export default function SignIn({providers}) {
    const router = useRouter();

    return (
        <div>
            <Stack align={"center"} justify={"center"} shadow={"xl"} mt={"20vh"}>
                <Image alt={"Gamajun logo"} src={"/logo.png"} height={112} width={400} quality={100}/>
                <Title order={1}>Vítejte v testovacím systému Gamajun</Title>
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
            <div style={{width: '100vw', height: '100vh', position: 'fixed', bottom:0, left: 0}}>
                <Image src={"/graduation.svg"} layout={"fill"}/>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const providers = await getProviders()
    return {
        props: {providers},
    }
}