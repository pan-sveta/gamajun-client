import {Group, Loader, Text} from '@mantine/core';
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
            {submission?.assignment?.description ?
                <div dangerouslySetInnerHTML={{__html: submission.assignment?.description}}/> : null}
            <BpmnViewer xml={submission?.xml == null ? undefined : submission.xml} />
        </div>
    );
}

export default SubmissionViewer