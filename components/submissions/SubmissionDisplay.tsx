import {Group, Loader, Paper, Text} from "@mantine/core";
import {SandboxSubmissionsByIdQuery, SubmissionByIdQuery} from "../../client/generated/generated-types";

import dynamic from "next/dynamic";
const BpmnViewer = dynamic(() => {
    return import("../../components/bpmn/modeler/BpmnViewer");
}, {
    loading: () => <Loader variant="bars"/>,
    ssr: false
});

interface SubmissionDisplayProps {
    submission: SubmissionByIdQuery['examSubmissionById']| SandboxSubmissionsByIdQuery['sandboxSubmissionById']
}

const SubmissionDisplay = ({submission} : SubmissionDisplayProps) => {
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

export default SubmissionDisplay