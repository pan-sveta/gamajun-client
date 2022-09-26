import {
    Assignment,
    ExamSubmission,
    ExamSubmissionSubmitCommand,
    StudentExamSubmissionDTO
} from "../../types/gamajun.ts";
import {createStyles, Card, Image, Text, Badge, Button, Stack, useMantineTheme, Loader, Group} from '@mantine/core';
import {useForm} from "@mantine/form";
import {checkpointSubmission, createAssignment, submitSubmission, updateAssignment} from "../../api/GamajunAPI";
import {showNotification} from "@mantine/notifications";
import {IconCheck, IconX, IconZoomCheck} from "@tabler/icons";
import {router} from "next/client";
import {useSession} from "next-auth/react";
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import {useEffect} from "react";

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