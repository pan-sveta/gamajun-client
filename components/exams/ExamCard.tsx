import {createStyles, Card, Image, Text, Group, RingProgress, Button, Stack, useMantineTheme} from '@mantine/core';
import {Exam} from "../../types/gamajun.ts";
import {IconAlertTriangle, IconReport, IconX} from "@tabler/icons";
import Box from "next-auth/providers/box";
import {useSession} from "next-auth/react";
import {createExamSubmission} from "../../api/GamajunAPI";
import {showNotification} from "@mantine/notifications";
import {useRouter} from "next/router";

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

interface ExamCardProps {
    exam: Exam
}

const ExamCard = ({exam}: ExamCardProps) => {
    const {classes} = useStyles();
    const theme = useMantineTheme();
    const {data: sessionData} = useSession();
    const token = String(sessionData?.accessToken);
    const router = useRouter();

    const createSubmission = () => {
        if (!exam.id) {
            showNotification({
                title: "Nepodařilo se zahájit zkoušku",
                message: "ID zkoušky je null",
                color: "red",
                icon: <IconX/>,
                autoClose: false
            });

            return;
        }

        createExamSubmission(exam.id, token)
            .then((examSubmission) => {
                router.push(`/submissions/${examSubmission.id}`)
            })
            .catch(err => showNotification({
                title: "Nepodařilo se zahájit zkoušku",
                message: err.message,
                color: "red",
                icon: <IconX/>,
                autoClose: false
            }));
    }

    return (
        <Card withBorder p="lg" className={classes.card}>
            <div className={classes.wrapper}>
                <div>
                    <Text size="sm" weight={700} className={classes.title}>
                        {exam.title}
                    </Text>
                    <Text mt="sm" mb="md" color="dimmed" size="xs">
                        Dostupné od {exam.accessibleFrom?.toLocaleString()} do {exam.accessibleTo?.toLocaleString()}
                    </Text>
                </div>
                <IconReport size={"5vh"} color={theme.colors.gray[5]}/>
            </div>

            <Card.Section className={classes.footer}>
                <Button leftIcon={<IconAlertTriangle/>} color={"red"}
                        onClick={() => createSubmission()}>Zahájit</Button>
            </Card.Section>
        </Card>
    );
}

export default ExamCard