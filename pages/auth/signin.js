import {getProviders, signIn} from "next-auth/react"
import {Button, Paper, Stack, Title} from "@mantine/core";
import {IconSchool} from "@tabler/icons";
import Image from "next/image";
import React from "react";

export default function SignIn({providers}) {
    return (
        <Paper>
            <Stack align={"center"} justify={"center"} shadow={"xl"} mt={"20vh"}>
                <Image alt={"Gamajun logo"} src={"/logo.png"} height={112} width={400} quality={100}/>
                <Title order={1}>Vítejte v testovacím systému Gamajun</Title>
                <Title order={2}>Pro pokračování se prosím přihlašte</Title>
                {Object.values(providers).map((provider) => (
                    <div key={provider.name}>
                        <Button onClick={() => signIn(provider.id, {redirect: true, callbackUrl: "/"})} leftIcon={<IconSchool/>}>
                            Přihlašte se pomocí {provider.name}
                        </Button>
                    </div>
                ))}
            </Stack>
        </Paper>
    )
}

export async function getServerSideProps(context) {
    const providers = await getProviders()
    return {
        props: {providers},
    }
}