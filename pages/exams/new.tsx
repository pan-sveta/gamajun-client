import {GetServerSideProps, InferGetServerSidePropsType, NextPage} from "next";
import AssignmentEditor from "../../components/assignments/AssignmentEditor";
import ExamEditor from "../../components/exams/ExamEditor";
import {getAllAssignments, getAllExams, getGamajunAccessToken} from "../../api/GamajunAPI";


const New: NextPage = ({assignments}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    return (
        <ExamEditor assignments={assignments}/>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const token = await getGamajunAccessToken(context);

    const assignments = await getAllAssignments(token);

    return {
        props: {
            assignments: assignments
        },
    }
}

export default New