import {getProviders, signIn} from "next-auth/react"
import {Button, Stack, Paper, Title} from "@mantine/core";
import {IconSchool} from "@tabler/icons";
import Image from "next/image";

export default function SignIn({providers}) {
    return (
        <Paper>
            <Stack align={"center"} justify={"center"} shadow={"xl"} mt={"20vh"}>
                <Image src={"/login-art.svg"} width={200} height={200} layout={"fixed"}/>
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