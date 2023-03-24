import React from 'react';
import {IconLogin, IconLogout} from "@tabler/icons";
import {Avatar, Box, Button, Group, Text, UnstyledButton, useMantineTheme} from '@mantine/core';
import {signIn, signOut, useSession} from "next-auth/react";
import {useRouter} from "next/router";

export default function User() {
    const theme = useMantineTheme();
    const {data: session} = useSession();
    const router = useRouter();

    let actionButton;
    if (!session)
        actionButton = <Button onClick={() => signIn()} leftIcon={<IconLogin/>} variant="white">Přihlásit se</Button>;
    else
        actionButton = (
            <UnstyledButton
                sx={{
                    display: 'block',
                    width: '100%',
                    padding: theme.spacing.xs,
                    borderRadius: theme.radius.sm,
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

                    '&:hover': {
                        backgroundColor:
                            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                    },
                }}
            >
                <Group>
                    <Avatar src={session.user?.image}/>
                    <Box sx={{flex: 1}}>
                        <Text size="sm" weight={500}>
                            {session.user?.name}
                        </Text>
                        <Text color="dimmed" size="xs">
                            {session.user?.email}
                        </Text>
                    </Box>
                    <UnstyledButton onClick={() => signOut({callbackUrl: `${process.env.NEXT_PUBLIC_GAMAJUN_API_URL}/logout?callbackUrl=${location.protocol + '//' + location.host}`})}>
                        <IconLogout color="red"/>
                    </UnstyledButton>

                </Group>
            </UnstyledButton>
        )


    return (
        <Box
            sx={{
                paddingTop: theme.spacing.sm,
                borderTop: `1px solid ${
                    theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
                }`,
            }}
        >
            {actionButton}
        </Box>
    )
}