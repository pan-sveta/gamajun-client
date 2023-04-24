import {Alert, Button, Card, createStyles, Text, useMantineTheme} from '@mantine/core';
import {IconAlertCircle, IconAlertTriangle, IconReport, IconX} from "@tabler/icons";
import {showNotification} from "@mantine/notifications";
import {useRouter} from "next/router";
import {
    OpenedExamsQuery,
    refetchMySubmissionsQuery,
    refetchOpenedExamsQuery,
    useBeginExamMutation
} from "../../client/generated/generated-types";
import React from "react";

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
        padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
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
    exam: OpenedExamsQuery["openedExams"][0]
}

const ExamCard = ({exam}: ExamCardProps) => {
    const {classes} = useStyles();
    const theme = useMantineTheme();
    const router = useRouter();

    const [beginExam, {loading, error}] = useBeginExamMutation({
        refetchQueries: [refetchMySubmissionsQuery(),refetchOpenedExamsQuery()]
    });

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

        beginExam({
            variables: {
                id: exam.id
            }
        })
            .then((examSubmission) => {
                router.push(`/submissions/${examSubmission.data?.beginExam.id}`)
            })
            .catch(err => showNotification({
                title: "Nepodařilo se zahájit zkoušku",
                message: err.message,
                color: "red",
                icon: <IconX/>,
                autoClose: false
            }));
    }

    if (error)
        return <Alert icon={<IconAlertCircle size={16}/>} title="Chyba!" color="red">{error.message}</Alert>

    return (
        <Card withBorder p="lg" className={classes.card}>
            <div className={classes.wrapper}>
                <div>
                    <Text size="sm" weight={700} className={classes.title}>
                        {exam.title}
                    </Text>
                    <Text mt="sm" mb="md" color="dimmed" size="xs">
                        Dostupné od {new Date(exam.accessibleFrom).toLocaleString()} do {new Date(exam.accessibleTo).toLocaleString()}
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