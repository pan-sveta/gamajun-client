import {getProviders, signIn} from "next-auth/react"
import {Center, Container, Button, Stack, ThemeIcon} from "@mantine/core";
import {IconSchool, IconShieldLock} from "@tabler/icons";
import Image from "next/image";

export default function SignIn({providers}) {
    return (
        <Stack align={"center"} justify={"center"} shadow={"xl"}>

            <Image src={"/login-art.svg"} width={200} height={200} layout={"fixed"}/>

            <h1>Gamajun přihlášení</h1>
            {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <Button onClick={() => signIn(provider.id)} leftIcon={<IconSchool/>}>
                        Přihlašte se pomocí {provider.name}
                    </Button>
                </div>
            ))}
        </Stack>
    )
}

export async function getServerSideProps(context) {
    const providers = await getProviders()
    return {
        props: {providers},
    }
}