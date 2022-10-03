import {Badge, Button, Card, createStyles, Text, useMantineTheme} from '@mantine/core';
import {IconPlayerPlay, IconSearch} from "@tabler/icons";
import Link from "next/link";
import {MySubmissionsQuery} from "../../client/generated/generated-types";

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
    examSubmission: MySubmissionsQuery["myExamSubmissions"][0]
}

const SubmissionCard = ({examSubmission}: SubmissionCardProps) => {
    const {classes} = useStyles();
    const theme = useMantineTheme();

    const statusBadge = () => {
        switch (examSubmission.examSubmissionState) {
            case "Draft":
                return <Badge color={"violet"}>Rozpracované</Badge>;
            case "Submitted":
                return <Badge color={"orange"}>Odevzdáno</Badge>;
            case "Graded":
                return <Badge color={"green"}>Oznámkováno</Badge>;
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