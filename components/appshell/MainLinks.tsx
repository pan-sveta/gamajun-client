import React from 'react';
import {IconCertificate, IconSettings, IconTemplate} from '@tabler/icons';
import {Group, Text, ThemeIcon, UnstyledButton} from '@mantine/core';
import Link from "next/link";
import {useSession} from "next-auth/react";
import GamajunLoader from "../common/GamajunLoader";

interface MainLinkProps {
    icon: React.ReactNode;
    color: string;
    label: string;
    uri: string;
}

export default function MainLink({icon, color, label, uri}: MainLinkProps) {
    return (
        <Link href={uri}>
            <UnstyledButton
                sx={(theme) => ({
                    display: 'block',
                    width: '100%',
                    padding: theme.spacing.xs,
                    borderRadius: theme.radius.sm,
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

                    '&:hover': {
                        backgroundColor:
                            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                    },
                })}>
                <Group>
                    <ThemeIcon color={color} variant="light">
                        {icon}
                    </ThemeIcon>

                    <Text size="sm">{label}</Text>
                </Group>
            </UnstyledButton>
        </Link>
    );
}

const data = [
    {icon: <IconTemplate size={16}/>, color: 'blue', label: 'Správce zadání', uri: '/assignments', adminOnly: true},
    {icon: <IconCertificate size={16}/>, color: 'teal', label: 'Správce zkoušek', uri: '/exams', adminOnly: true},
    {icon: <IconCertificate size={16}/>, color: 'red', label: 'Zkoušky', uri: '/exams/my', adminOnly: false},
    {icon: <IconSettings size={16}/>, color: 'violet', label: 'Nastavení', uri: '/settings', adminOnly: false}
];

export function MainLinks() {
    let {data: session} = useSession();

    if (!session)
        return <GamajunLoader/>

    let links;

    if (session?.isAdmin)
        links = data.map((link) => <MainLink {...link} key={link.label}/>);
    else
        links = data.filter(nav => !nav.adminOnly).map((link) => <MainLink {...link} key={link.label}/>);

    return <div>{links}</div>;
}