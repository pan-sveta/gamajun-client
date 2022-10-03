import {Group, Loader, Paper, Text} from '@mantine/core';
import dynamic from "next/dynamic";
import {SubmissionByIdQuery} from "../../client/generated/generated-types";

const BpmnViewer = dynamic(() => {
    return import("../../components/bpmn/modeler/BpmnViewer");
}, {
    loading: () => <Loader variant="bars"/>,
    ssr: false
});

interface SubmissionViewerProps {
    submission: SubmissionByIdQuery['examSubmissionById']
}

const SubmissionViewer = ({submission}: SubmissionViewerProps) => {
    return (
        <div>

            <Group position={"apart"}>
                <h1>{submission?.assignment?.title}</h1>
                <Text>Odevzdáno: {submission?.submittedAt}</Text>
            </Group>
            <Paper shadow="xs" p="md" my={"md"} withBorder>
                <div dangerouslySetInnerHTML={{__html: submission?.assignment?.description ?? "N/A"}}/>
            </Paper>
            <Paper shadow="xs" p="md" my={"md"} withBorder>
                <BpmnViewer xml={submission?.xml == null ? undefined : submission.xml}/>
            </Paper>
        </div>
    );
}

export default SubmissionViewer