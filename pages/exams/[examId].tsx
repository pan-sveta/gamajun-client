import {GetServerSideProps, InferGetServerSidePropsType, NextPage} from "next";
import ExamEditor from "../../components/exams/ExamEditor";
import {ExamFromJSON} from "../../types/gamajun.ts";
import {getAllAssignments, getExam} from "../../api/GamajunAPIServer";

const AllExams: NextPage = ({exam,assignments}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    //Fix protože next neumí ze SSP poslat date type, tak to posílám jako JSON a typuju až tady
    // @ts-ignore
    //TODO: FiX
    exam = ExamFromJSON(exam);

    return (
       <ExamEditor exam={exam} assignments={assignments}/>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const exam = await getExam(String(context?.params?.examId),context);
    const assignments = await getAllAssignments(context);

    return {
        props: {
            exam: exam,
            assignments: assignments
        }, // will be passed to the page component as props
    }
}

export default AllExams