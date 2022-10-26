import {NextPage} from "next";
import SubmissionEditor from "../../../components/submissions/SubmissionEditor";
import SubmissionViewer from "../../../components/submissions/SubmissionViewer";
import {
    SandboxSubmissionsByIdQuery,
    useSandboxSubmissionsByIdQuery,
    useSubmissionByIdQuery
} from "../../../client/generated/generated-types";
import {useRouter} from "next/router";
import GamajunLoader from "../../../components/common/GamajunLoader";

const SandboxAttempt: NextPage = () => {
    const router = useRouter();
    const {submissionId} = router.query

    const {data, loading, error} = useSandboxSubmissionsByIdQuery({
        variables: {
            id: typeof submissionId === 'string' ? submissionId : "NO ID"
        }
    });

    if (error)
        return <div>{error.message}</div>

    if (!data?.sandboxSubmissionById || loading)
        return <GamajunLoader/>;


    if (data.sandboxSubmissionById.xml === null)
        return <SubmissionEditor submission={data.sandboxSubmissionById}/>
    else
        return <SubmissionViewer submission={data.sandboxSubmissionById}/>
}

export default SandboxAttempt

