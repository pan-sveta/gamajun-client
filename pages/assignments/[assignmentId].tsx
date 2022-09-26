import {GetServerSideProps, InferGetServerSidePropsType, NextPage} from "next";
import AssignmentEditor from "../../components/assignments/AssignmentEditor";
import {getAssignment} from "../../api/GamajunAPIServer";

const AllAssignments: NextPage = ({assignment}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    return (
       <AssignmentEditor assignment={assignment}/>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const assignment = await getAssignment(String(context?.params?.assignmentId),context);

    return {
        props: {
            assignment: assignment
        }, // will be passed to the page component as props
    }
}

export default AllAssignments