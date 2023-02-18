import React from 'react';
import {IconBeach, IconCertificate, IconHome, IconSchool, IconSettings, IconTemplate} from "@tabler/icons";
import {Group, Text, ThemeIcon, UnstyledButton} from '@mantine/core';
import Link from "next/link";
import {useSession} from "next-auth/react";
import GamajunLoader from "../common/GamajunLoader";
import {JSXElement} from "@babel/types";

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
                    <ThemeIcon color={color} variant="filled">
                        {icon}
                    </ThemeIcon>

                    <Text size="sm">{label}</Text>
                </Group>
            </UnstyledButton>
        </Link>
    );
}

const data = [
    {
        icon: <IconHome size={16}/>,
        color: 'lime', label: 'Domů', uri: '/', requiredRole: null
    },
    {
        icon: <IconTemplate size={16}/>,
        color: 'blue',
        label: 'Správce zadání',
        uri: '/assignments',
        requiredRole: "GAMAJUN_TEACHER"
    },
    {
        icon: <IconCertificate size={16}/>,
        color: 'teal',
        label: 'Správce zkoušek',
        uri: '/exams',
        requiredRole: "GAMAJUN_TEACHER"
    },
    {
        icon: <IconSchool size={16}/>,
        color: 'pink',
        label: 'Třídy',
        uri: '/classrooms',
        requiredRole: "GAMAJUN_TEACHER"
    },
    {
        icon: <IconCertificate size={16}/>,
        color: 'red',
        label: 'Zkoušky',
        uri: '/exams/my',
        requiredRole: "GAMAJUN_STUDENT"
    },
    {
        icon: <IconBeach size={16}/>,
        color: 'yellow',
        label: 'Sandbox',
        uri: '/sandbox',
        requiredRole: "GAMAJUN_STUDENT"
    }
];

export function MainLinks() {
    let {data: session} = useSession();

    if (!session)
        return <GamajunLoader/>

    let links: Array<JSX.Element> = [];

    data.forEach(link => {
        if (link.requiredRole == null)
            links.push(<MainLink {...link} key={link.label}/>);
        else { // @ts-ignore
            if (session?.user.roles.includes(link.requiredRole))
                links.push(<MainLink {...link} key={link.label}/>);
        }

    })

    return <div>{links}</div>;
}