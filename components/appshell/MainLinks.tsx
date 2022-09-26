import React from 'react';
import {
    IconGitPullRequest,
    IconAlertCircle,
    IconMessages,
    IconDatabase,
    IconTemplate,
    IconCertificate, IconSettings
} from '@tabler/icons';
import {ThemeIcon, UnstyledButton, Group, Text} from '@mantine/core';
import Link from "next/link";

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
                })}
            >
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
    {icon: <IconTemplate size={16}/>, color: 'blue', label: 'Správce zadání', uri: '/assignments'},
    {icon: <IconCertificate size={16}/>, color: 'teal', label: 'Správce zkoušek', uri: '/exams'},
    {icon: <IconCertificate size={16}/>, color: 'teal', label: 'Zkoušky', uri: '/exams/my'},
    {icon: <IconSettings size={16}/>, color: 'violet', label: 'Nastavení', uri: '/settings'}
];

export function MainLinks() {
    const links = data.map((link) => <MainLink {...link} key={link.label}/>);
    return <div>{links}</div>;
}