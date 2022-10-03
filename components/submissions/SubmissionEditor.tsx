import {Button, Group, Loader} from '@mantine/core';
import {useForm} from "@mantine/form";
import {showNotification} from "@mantine/notifications";
import {IconCheck, IconX, IconZoomCheck} from "@tabler/icons";
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import {
    ExamSubmissionSubmitInput,
    QueryExamSubmissionByIdArgs, refetchMySubmissionsQuery, refetchSubmissionByIdQuery,
    SubmissionByIdQuery, SubmitExamSubmissionMutationVariables,
    useSubmitExamSubmissionMutation
} from "../../client/generated/generated-types";

const BpmnModeler = dynamic(() => {
    return import("../../components/bpmn/modeler/BpmnModeler");
}, {
    loading: () => <Loader variant="bars"/>,
    ssr: false
});

interface SubmissionEditorProps {
    submission: SubmissionByIdQuery['examSubmissionById']
}

const SubmissionEditor = ({submission}: SubmissionEditorProps) => {
    const router = useRouter();

    const [submitSubmission, {loading, error}] = useSubmitExamSubmissionMutation({
        refetchQueries: [refetchMySubmissionsQuery()]
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
        submitSubmission({
            variables: {
                input: values
            }
        })
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
                <h1>{submission?.assignment?.title}</h1>
                <Button leftIcon={<IconZoomCheck/>} color={"green"} type={"submit"}>Odevzdat</Button>
            </Group>
            {submission?.assignment?.description ?
                <div dangerouslySetInnerHTML={{__html: submission.assignment?.description}}/> : null}
            <BpmnModeler xml={formo.values.xml} onXmlChange={(newXml) => formo.setFieldValue("xml", newXml)}/>
        </form>
    );
}

export default SubmissionEditor