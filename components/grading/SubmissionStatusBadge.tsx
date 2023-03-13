import React from 'react';
import {ExamSubmissionState} from "../../client/generated/generated-types";
import {Badge} from "@mantine/core";

interface SubmissionStatusBadgeProps{
    status: ExamSubmissionState | undefined
}

const SubmissionStatusBadge = ({status}:SubmissionStatusBadgeProps) => {
    switch (status) {
        case ExamSubmissionState.Draft:
            return <Badge color={"gray"}>Koncept</Badge>
        case ExamSubmissionState.Submitted:
            return <Badge color={"yellow"}>Odevzdáno</Badge>
        case ExamSubmissionState.Graded:
            return <Badge color={"green"}>Ohodnoceno</Badge>
        default:
            return <Badge color={"red"}>Error</Badge>
    }
};

export default SubmissionStatusBadge;
