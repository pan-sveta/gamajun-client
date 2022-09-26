import {createStyles, Card, Image, Text, Badge,Button, Stack, useMantineTheme} from '@mantine/core';
import {Exam, ExamSubmission} from "../../types/gamajun.ts";
import {IconPlayerPlay, IconReport, IconSearch, IconX} from "@tabler/icons";
import Box from "next-auth/providers/box";
import {useSession} from "next-auth/react";
import {createExamSubmission} from "../../api/GamajunAPI";
import {showNotification} from "@mantine/notifications";
import {useRouter} from "next/router";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    wrapper: {
        display: "flex",
        justifyContent: "space-between"
    },

    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: `${theme.spacing.sm}px ${theme.spacing.lg}px`,
        borderTop: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
        }`,
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        lineHeight: 1,
    },
}));

interface SubmissionCardProps {
    examSubmission: ExamSubmission
}

const SubmissionCard = ({examSubmission}: SubmissionCardProps) => {
    const {classes} = useStyles();
    const theme = useMantineTheme();
    const {data: sessionData} = useSession();

    const statusBadge = () => {
        switch (examSubmission.examSubmissionState) {
            case "Draft":
                return <Badge color={"violet"}>{examSubmission.examSubmissionState}</Badge>;
            case "Submitted":
                return <Badge color={"orange"}>{examSubmission.examSubmissionState}</Badge>;
            case "Graded":
                return <Badge color={"green"}>{examSubmission.examSubmissionState}</Badge>;
        }

    }

    const button = () => {
        switch (examSubmission.examSubmissionState) {
            case "Draft":
                return <Button leftIcon={<IconPlayerPlay/>} color={"green"}>Pokračovat</Button>;
            case "Submitted":
                return <Button leftIcon={<IconSearch/>}>Zobrazit</Button>;
            case "Graded":
                return <Button>Zobrazit</Button>;
        }

    }

    return (
        <Card withBorder p="lg" className={classes.card}>
            <div className={classes.wrapper}>
                <div>
                    <Text size="sm" weight={700} className={classes.title}>
                        {examSubmission.exam?.title}
                    </Text>
                    <Text mt="sm" mb="md" color="dimmed" size="xs">
                        Zahájeno: {examSubmission?.startedAt?.toLocaleString()}
                    </Text>
                    {examSubmission?.submittedAt ? <Text mt="sm" mb="md" color="dimmed" size="xs">
                        Odevzdáno: {examSubmission?.submittedAt?.toLocaleString()}
                    </Text> : null}
                </div>
                {statusBadge()}
            </div>

            <Card.Section className={classes.footer}>
                <Link href={`/submissions/${examSubmission.id}`}>
                    {button()}
                </Link>
            </Card.Section>
        </Card>
    );
}

export default SubmissionCard