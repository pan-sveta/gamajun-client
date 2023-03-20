import {
    refetchMySandboxSubmissionsQuery,
    SandboxAssignmentsQuery,
    useCreateSandboxSubmissionMutation,
    useMySandboxSubmissionsQuery,
} from "../../client/generated/generated-types";
import {
    ActionIcon,
    Button,
    Card,
    Collapse,
    createStyles, Flex,
    Group,
    Stack,
    Text,
    Title,
    useMantineTheme
} from "@mantine/core";
import {IconBeach, IconCertificate, IconEdit, IconRotateClockwise2, IconRuler2, IconX} from "@tabler/icons-react";
import {showNotification} from "@mantine/notifications";
import {useRouter} from "next/router";
import {useState} from "react";

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        overflow: "visible"
    },

    wrapper: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },

    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: `15px`,
        borderTop: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
        }`,
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        lineHeight: 1,
    },
}));

interface SandboxCardProps {
    assignment: SandboxAssignmentsQuery["sandboxAssignments"][0]
}

const SandboxCard = ({assignment}: SandboxCardProps) => {
    const {classes} = useStyles();
    const theme = useMantineTheme();
    const router = useRouter();

    const [submissionDisplayed, setSubmissionDisplayed] = useState(false);

    const {data, loading: mySubmissionLoading, error: mySubmissionError} = useMySandboxSubmissionsQuery({
        variables: {
            assignmentId: assignment.id
        }
    })

    const [createExamSubmission, {loading: createLoading, error: createError}] = useCreateSandboxSubmissionMutation({
        variables: {
            assignmentId: assignment.id
        },
        refetchQueries: [refetchMySandboxSubmissionsQuery({assignmentId: assignment.id})]
    });

    function createSubmission() {
        if (!assignment.id) {
            showNotification({
                title: "Nepodařilo se zahájit sandbox pokus",
                message: "ID zkoušky je null",
                color: "red",
                icon: <IconX/>,
                autoClose: false
            });

            return;
        }

        createExamSubmission({
            variables: {
                assignmentId: assignment.id
            }
        })
            .then((sandboxSubmission) => {
                router.push(`/sandbox/${sandboxSubmission.data?.createSandboxSubmission.id}`)
            })
            .catch(err => showNotification({
                title: "Nepodařilo se zahájit zkoušku",
                message: err.message,
                color: "red",
                icon: <IconX/>,
                autoClose: false
            }));
    }

    const navigate = (sandboxSubmissionId: string) => {
        router.push(`/sandbox/${sandboxSubmissionId}`)
    }

    const previousAttempts = data?.mySandboxSubmissions.map((sub) => {
        return (
            <Group key={sub.id} spacing={3} align={"center"}>
                <ActionIcon variant={"subtle"} color={"violet"} onClick={() => navigate(sub.id)}>{sub.submittedAt ?
                    <IconCertificate/> : <IconEdit/>}</ActionIcon>
                <Text>{new Date(sub.startedAt).toLocaleString()}</Text>

            </Group>
        )
    })

    return (
        <Card withBorder className={classes.card}>
            <div className={classes.wrapper}>
                <div>
                    <Title order={2} size={"h2"} weight={700} className={classes.title}>
                        {assignment.title}
                    </Title>
                </div>
                <IconBeach size={"5vh"} color={theme.colors.yellow[5]}/>
            </div>

            <Card.Section className={classes.footer}>

                <Button leftIcon={<IconRuler2/>} color={"yellow"}
                        onClick={() => createSubmission()}
                        loading={createLoading}>Vyzkoušet</Button>
                <ActionIcon color="violet" variant="subtle" size={"lg"}
                            onClick={() => setSubmissionDisplayed(!submissionDisplayed)}
                            loading={mySubmissionLoading}>
                    <IconRotateClockwise2/>
                </ActionIcon>


            </Card.Section>

            <Collapse in={submissionDisplayed}>
                <Card.Section className={classes.footer}>
                    <Stack spacing={"xs"}>
                        <Title order={3} size={"large"}>Předchozí pokusy</Title>
                        {previousAttempts}
                    </Stack>
                </Card.Section>
            </Collapse>
        </Card>
    );
}

export default SandboxCard