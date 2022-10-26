import {Button, Group, Loader, Paper} from '@mantine/core';
import {useForm} from "@mantine/form";
import {showNotification} from "@mantine/notifications";
import {IconCheck, IconX, IconZoomCheck} from "@tabler/icons";
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import {
    ExamSubmissionSubmitInput, refetchMySandboxSubmissionsQuery,
    refetchMySubmissionsQuery, refetchOpenedExamsQuery, SandboxSubmissionsByIdQuery,
    SubmissionByIdQuery,
    useSubmitExamSubmissionMutation, useSubmitSandboxSubmissionMutation
} from "../../client/generated/generated-types";
import {is} from "@babel/types";

const BpmnModeler = dynamic(() => {
    return import("../../components/bpmn/modeler/BpmnModeler");
}, {
    loading: () => <Loader variant="bars"/>,
    ssr: false
});

interface SubmissionEditorProps {
    submission: SubmissionByIdQuery['examSubmissionById'] | SandboxSubmissionsByIdQuery['sandboxSubmissionById']
}

const SubmissionEditor = ({submission}: SubmissionEditorProps) => {
    const router = useRouter();

    const [submitSubmission, {loading, error}] = useSubmitExamSubmissionMutation({
        refetchQueries: [refetchMySubmissionsQuery(), refetchOpenedExamsQuery()]
    });

    const [submitSandbox, {loading: loadingSandbox, error: errorSandbox}] = useSubmitSandboxSubmissionMutation({
        refetchQueries: [refetchMySandboxSubmissionsQuery({assignmentId: submission?.assignment.id || "NA"})]
    });

    const formo = useForm<ExamSubmissionSubmitInput>({
        initialValues: {
            id: submission?.id,
            xml: submission?.xml,
        },
        validate: {
            xml: (value: string) => (value == undefined ? 'Diagram nesmí být prázdný.' : null),
        },
    });

    const submitByType = () => {
        if(submission?.__typename === "ExamSubmission")
            return submitSubmission;
        else
            return submitSandbox
    }

    const submitExam = (values: ExamSubmissionSubmitInput) => {
        submitByType()({
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
                router.push(`/exams/my`)
            })
            .catch(err => showNotification({
                title: "Chyba při odevzdávání zkoušky",
                message: err.message,
                color: "red",
                icon: <IconX/>,
                autoClose: false
            }));
    }

    return (
        <form onSubmit={formo.onSubmit((values) => submitExam(values))}>

            <Group position={"apart"}>
                <h1>{submission?.assignment?.title}</h1>
                <Button leftIcon={<IconZoomCheck/>} color={"green"} type={"submit"} loading={loading || loadingSandbox}>Odevzdat</Button>
            </Group>
            <Paper shadow="xs" p="md" my={"md"} withBorder>
                <div dangerouslySetInnerHTML={{__html: submission?.assignment?.description ?? "N/A"}}/>
            </Paper>
            <Paper shadow="xs" p="md" withBorder>
                <BpmnModeler xml={formo.values.xml} onXmlChange={(newXml) => formo.setFieldValue("xml", newXml)}/>
            </Paper>
        </form>
    );
}

export default SubmissionEditor