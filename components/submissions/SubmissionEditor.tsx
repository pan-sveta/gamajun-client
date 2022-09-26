import {ExamSubmissionSubmitCommand, StudentExamSubmissionDTO} from "../../types/gamajun.ts";
import {Button, Group, Loader} from '@mantine/core';
import {useForm} from "@mantine/form";
import {submitSubmission} from "../../api/GamajunAPIClient";
import {showNotification} from "@mantine/notifications";
import {IconCheck, IconX, IconZoomCheck} from "@tabler/icons";
import dynamic from "next/dynamic";
import {useRouter} from "next/router";

const BpmnModeler = dynamic(() => {
    return import("../../components/bpmn/modeler/BpmnModeler");
}, {
    loading: () => <Loader variant="bars"/>,
    ssr: false
});

interface SubmissionEditorProps {
    submission: StudentExamSubmissionDTO
}

const SubmissionEditor = ({submission}: SubmissionEditorProps) => {
    const router = useRouter();

    const formo = useForm<ExamSubmissionSubmitCommand>({
        initialValues: {
            xml: submission?.xml,
        },
        validate: {
            xml: (value: string) => (value == undefined ? 'Diagram nesmí být prázdný.' : null),
        },
    });

    const submitExam = (values: ExamSubmissionSubmitCommand) => {
        if (!submission.id)
            return;

        submitSubmission(submission.id, values)
            .then(assignment => {
                showNotification({
                    title: "Zkouška byla úspěšně odevzdána",
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
                <h1>{submission.assignment?.title}</h1>
                <Button leftIcon={<IconZoomCheck/>} color={"green"} type={"submit"}>Odevzdat</Button>
            </Group>
            {submission.assignment?.description ?
                <div dangerouslySetInnerHTML={{__html: submission.assignment?.description}}/> : null}
            <BpmnModeler xml={formo.values.xml} onXmlChange={(newXml) => formo.setFieldValue("xml", newXml)}/>
        </form>
    );
}

export default SubmissionEditor