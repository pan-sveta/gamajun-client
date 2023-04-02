import {NextPage} from "next";
import ExamSubmissionEditor from "../../../components/submissions/ExamSubmissionEditor";
import SubmissionViewer from "../../../components/submissions/SubmissionViewer";
import {useSubmissionByIdQuery} from "../../../client/generated/generated-types";
import {useRouter} from "next/router";
import GamajunLoader from "../../../components/common/GamajunLoader";
import {IconAlertCircle} from "@tabler/icons";
import React from "react";
import {Alert} from "@mantine/core";

const AllExams: NextPage = () => {
    const router = useRouter();
    const {submissionId} = router.query

    const {data, loading, error} = useSubmissionByIdQuery({
        variables: {
            id: typeof submissionId === 'string' ? submissionId : "NO ID"
        }
    });

    if (error)
        return <Alert icon={<IconAlertCircle size={16}/>} title="Chyba!" color="red">{error.message}</Alert>

    if (!data?.examSubmissionById || loading)
        return <GamajunLoader/>;


    if (data.examSubmissionById.examSubmissionState === "Draft")
        return <ExamSubmissionEditor submission={data.examSubmissionById}/>
    else
        return <SubmissionViewer submission={data?.examSubmissionById}/>
}

export default AllExams
