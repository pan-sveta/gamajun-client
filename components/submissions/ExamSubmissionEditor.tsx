import {Button, Flex, Group, Loader, Paper, Stack, Text, Title} from '@mantine/core';
import {useForm} from "@mantine/form";
import {showNotification} from "@mantine/notifications";
import {IconCheck, IconCircleCheck, IconX, IconZoomCheck} from "@tabler/icons";
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import {
    ExamSubmissionSubmitInput,
    refetchMySubmissionsQuery,
    refetchOpenedExamsQuery,
    SubmissionByIdQuery,
    useCheckpointExamSubmissionMutation,
    useSubmitExamSubmissionMutation
} from "../../client/generated/generated-types";
import Countdown from "react-countdown";
import {useEffect} from "react";

const BpmnModeler = dynamic(() => {
    return import("../../components/bpmn/modeler/BpmnModeler");
}, {
    loading: () => <Loader variant="bars"/>,
    ssr: false
});

interface SubmissionEditorProps {
    submission: SubmissionByIdQuery['examSubmissionById']
}

const ExamSubmissionEditor = ({submission}: SubmissionEditorProps) => {
    const router = useRouter();

    const [submitSubmission, {loading, error}] = useSubmitExamSubmissionMutation({
        refetchQueries: [refetchMySubmissionsQuery(), refetchOpenedExamsQuery()]
    });

    const [checkpointSubmission, {
        loading: checkpointLoading,
        error: checkpointError
    }] = useCheckpointExamSubmissionMutation({});

    const formo = useForm<ExamSubmissionSubmitInput>({
        initialValues: {
            id: submission?.id,
            xml: submission?.xml,
        },
        validate: {
            xml: (value: string) => (value == undefined ? 'Diagram nesmí být prázdný.' : null),
        },
    });

    const submitExam = (values: ExamSubmissionSubmitInput) => {
        submitSubmission({
            variables: {
                input: values
            }
        })
            .then(assignment => {
                showNotification({
                    title: "Úspěšně odevzdáno",
                    message: `Vyčkejte na ohodnocení"`,
                    color: "green",
                    icon: <IconCheck/>,
                })
                router.push(`/submissions/${submission?.id}`)
            })
            .catch(err => showNotification({
                title: "Chyba při odevzdávání zkoušky",
                message: err.message,
                color: "red",
                icon: <IconX/>,
                autoClose: false
            }));
    }

    useEffect(() => {
        const interval = setInterval(() => {
            checkpointSubmission({
                variables: {
                    input: formo.values
                }
            }).then();
        }, 60000);

        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [checkpointSubmission])

    const countdownTime = new Date(new Date(submission?.startedAt ?? 0).getTime() + (submission?.exam?.timeLimit ?? 0) * 60000);

    return (
        <div>
            <form onSubmit={formo.onSubmit((values) => submitExam(values))}>
                <Group position={"apart"}>
                    <Stack spacing={"xs"}>
                        <Title order={1}>{submission?.assignment?.title}</Title>
                        <Flex align={"center"}>
                            {checkpointLoading ? <Loader size={"xs"} variant="bars" /> : <IconCircleCheck color={"green"}/>}
                            <Text color={"gray"} ml={"5px"}>Automatické ukládání</Text>
                        </Flex>
                    </Stack>
                    <Flex justify={"center"} align={"center"}>
                        <Text fz={"lg"} fw={"bolder"} mx={"xs"}>
                            <Countdown date={countdownTime} onComplete={() => submitExam(formo.values)}/>
                        </Text>
                        <Button leftIcon={<IconZoomCheck/>} color={"green"} type={"submit"}
                                loading={loading}>Odevzdat</Button>
                    </Flex>
                </Group>
                <Paper shadow="xs" p="md" my={"md"} withBorder>
                    <div dangerouslySetInnerHTML={{__html: submission?.assignment?.description ?? "N/A"}}/>
                </Paper>
                <Paper shadow="xs" p="md" withBorder>
                    <BpmnModeler xml={formo.values.xml} onXmlChange={(newXml) => formo.setFieldValue("xml", newXml)}/>
                </Paper>
            </form>
        </div>
    )
        ;
}

export default ExamSubmissionEditor