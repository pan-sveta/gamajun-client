import {GetServerSideProps, InferGetServerSidePropsType, NextPage} from "next";
import {getAllAssignments, getAssignment, getGamajunAccessToken} from "../../api/GamajunAPI";
import {getSession} from "next-auth/react";
import {Table} from "@mantine/core";
import Link from "next/link";
import AssignmentEditor from "../../components/assignments/AssignmentEditor";

const AllAssignments: NextPage = ({assignment}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    return (
       <AssignmentEditor assignment={assignment}/>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const token = await getGamajunAccessToken(context);

    const assignment = await getAssignment(String(context?.params?.assignmentId) ,token);

    return {
        props: {
            assignment: assignment
        }, // will be passed to the page component as props
    }
}

export default AllAssignments