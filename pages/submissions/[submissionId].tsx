import {GetServerSideProps, InferGetServerSidePropsType, NextPage} from "next";
import {getAllAssignments, getExam, getGamajunAccessToken, getSubmission} from "../../api/GamajunAPI";
import ExamEditor from "../../components/exams/ExamEditor";
import {
    ExamFromJSON,
    ExamSubmissionFromJSON,
    StudentExamSubmissionDTO,
    StudentExamSubmissionDTOFromJSON
} from "../../types/gamajun.ts";
import SubmissionEditor from "../../components/submissions/SubmissionEditor";
import SubmissionViewer from "../../components/submissions/SubmissionViewer";

const AllExams: NextPage = ({submission}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    //Fix protože next neumí ze SSP poslat date type, tak to posílám jako JSON a typuju až tady
    // @ts-ignore
    //TODO: FiX
    let submissionConverted: StudentExamSubmissionDTO = StudentExamSubmissionDTOFromJSON(submission);

    if (submissionConverted.examSubmissionState === "Draft")
        return <SubmissionEditor submission={submissionConverted}/>
    else
        return <SubmissionViewer submission={submissionConverted}/>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const token = await getGamajunAccessToken(context);

    const submission = await getSubmission(String(context?.params?.submissionId), token);

    return {
        props: {
            submission: submission,
        },
    }
}

export default AllExams