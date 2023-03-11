import {Button, Group, Loader, Paper} from '@mantine/core';
import {useForm} from "@mantine/form";
import {showNotification} from "@mantine/notifications";
import {IconCheck, IconX, IconZoomCheck} from "@tabler/icons";
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import {
    ExamSubmissionSubmitInput,
    refetchMySandboxSubmissionsQuery,
    SandboxSubmissionsByIdQuery,
    useSubmitSandboxSubmissionMutation
} from "../../client/generated/generated-types";
import Head from "next/head";
import React from "react";

const BpmnModeler = dynamic(() => {
    return import("../../components/bpmn/modeler/BpmnModeler");
}, {
    loading: () => <Loader variant="bars"/>,
    ssr: false
});

interface SandboxSubmissionEditorProps {
    submission: SandboxSubmissionsByIdQuery['sandboxSubmissionById']
}

const SandboxSubmissionEditor = ({submission}: SandboxSubmissionEditorProps) => {
    const router = useRouter();

    const [submitSandbox, {loading, error}] = useSubmitSandboxSubmissionMutation({
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


    const submitExam = (values: ExamSubmissionSubmitInput) => {
        submitSandbox({
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
                router.push(`/sandbox/${submission?.id}`)
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
        <div>
            <Head>
                <title>{submission?.assignment.title} | Gamajun</title>
            </Head>
            <form onSubmit={formo.onSubmit((values) => submitExam(values))}>
                <Group position={"apart"}>
                    <h1>{submission?.assignment?.title}</h1>
                    <Button leftIcon={<IconZoomCheck/>} color={"green"} type={"submit"} loading={loading}>Odevzdat</Button>
                </Group>
                <Paper shadow="xs" p="md" my={"md"} withBorder>
                    <div dangerouslySetInnerHTML={{__html: submission?.assignment?.description ?? "N/A"}}/>
                </Paper>
                <Paper shadow="xs" p="md" withBorder>
                    <BpmnModeler xml={formo.values.xml} onXmlChange={(newXml) => formo.setFieldValue("xml", newXml)}/>
                </Paper>
            </form>
        </div>
    );
}

export default SandboxSubmissionEditor