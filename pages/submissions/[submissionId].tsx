import {GetServerSideProps, InferGetServerSidePropsType, NextPage} from "next";
import {StudentExamSubmissionDTO, StudentExamSubmissionDTOFromJSON} from "../../types/gamajun.ts";
import SubmissionEditor from "../../components/submissions/SubmissionEditor";
import SubmissionViewer from "../../components/submissions/SubmissionViewer";
import {getSubmission} from "../../api/GamajunAPIServer";

const AllExams: NextPage = ({submission}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    //Fix protože next neumí ze SSP poslat date type, tak to posílám jako JSON a tipuji až tady
    // @ts-ignore
    //TODO: FiX
    let submissionConverted: StudentExamSubmissionDTO = StudentExamSubmissionDTOFromJSON(submission);

    if (submissionConverted.examSubmissionState === "Draft")
        return <SubmissionEditor submission={submissionConverted}/>
    else
        return <SubmissionViewer submission={submissionConverted}/>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const submission = await getSubmission(String(context?.params?.submissionId), context);

    return {
        props: {
            submission: submission,
        },
    }
}

export default AllExams