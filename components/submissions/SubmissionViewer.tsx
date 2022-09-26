import {StudentExamSubmissionDTO} from "../../types/gamajun.ts";
import {Group, Loader, Text} from '@mantine/core';
import dynamic from "next/dynamic";

const BpmnViewer = dynamic(() => {
    return import("../../components/bpmn/modeler/BpmnViewer");
}, {
    loading: () => <Loader variant="bars"/>,
    ssr: false
});

interface SubmissionViewerProps {
    submission: StudentExamSubmissionDTO
}

const SubmissionViewer = ({submission}: SubmissionViewerProps) => {
    return (
        <div>

            <Group position={"apart"}>
                <h1>{submission.assignment?.title}</h1>
                <Text>Odevzdáno: {submission.submittedAt?.toLocaleDateString()}</Text>
            </Group>
            {submission.assignment?.description ?
                <div dangerouslySetInnerHTML={{__html: submission.assignment?.description}}/> : null}
            <BpmnViewer xml={submission.xml} />
        </div>
    );
}

export default SubmissionViewer