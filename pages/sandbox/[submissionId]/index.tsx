import {NextPage} from "next";
import SubmissionViewer from "../../../components/submissions/SubmissionViewer";
import {useSandboxSubmissionsByIdQuery} from "../../../client/generated/generated-types";
import {useRouter} from "next/router";
import GamajunLoader from "../../../components/common/GamajunLoader";
import SandboxSubmissionEditor from "../../../components/submissions/SandboxSubmissionEditor";
import {IconAlertCircle} from "@tabler/icons-react";
import React from "react";
import {Alert} from "@mantine/core";

const SandboxAttempt: NextPage = () => {
    const router = useRouter();
    const {submissionId} = router.query

    const {data, loading, error} = useSandboxSubmissionsByIdQuery({
        variables: {
            id: typeof submissionId === 'string' ? submissionId : "NO ID"
        }
    });

    if (error)
        return <Alert icon={<IconAlertCircle size={16}/>} title="Chyba!" color="red">{error.message}</Alert>

    if (!data?.sandboxSubmissionById || loading)
        return <GamajunLoader/>;


    if (data.sandboxSubmissionById.xml === null)
        return <SandboxSubmissionEditor submission={data.sandboxSubmissionById}/>
    else
        return <SubmissionViewer submission={data.sandboxSubmissionById}/>
}

export default SandboxAttempt

