import {GetServerSideProps, InferGetServerSidePropsType, NextPage} from "next";
import {getAllAssignments, getExam, getGamajunAccessToken} from "../../api/GamajunAPI";
import ExamEditor from "../../components/exams/ExamEditor";
import {ExamFromJSON} from "../../types/gamajun.ts";

const AllExams: NextPage = ({exam,assignments}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    //Fix protože next neumí ze SSP poslat date type, tak to posílám jako JSON a typuju až tady
    // @ts-ignore
    exam = ExamFromJSON(exam);

    return (
       <ExamEditor exam={exam} assignments={assignments}/>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const token = await getGamajunAccessToken(context);

    const exam = await getExam(String(context?.params?.examId) ,token);
    const assignments = await getAllAssignments(token);

    return {
        props: {
            exam: exam,
            assignments: assignments
        }, // will be passed to the page component as props
    }
}

export default AllExams