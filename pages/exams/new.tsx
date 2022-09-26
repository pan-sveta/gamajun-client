import {GetServerSideProps, InferGetServerSidePropsType, NextPage} from "next";
import ExamEditor from "../../components/exams/ExamEditor";
import {getAllAssignments} from "../../api/GamajunAPIServer";


const New: NextPage = ({assignments}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    return (
        <ExamEditor assignments={assignments}/>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const assignments = await getAllAssignments(context);

    return {
        props: {
            assignments: assignments
        },
    }
}

export default New