import {GetServerSideProps, InferGetServerSidePropsType, NextPage} from "next";
import {GetAllAssignments, GetAssignment, GetGamajunAccessToken} from "../../api/GamajunAPI";
import {getSession} from "next-auth/react";
import {Table} from "@mantine/core";
import Link from "next/link";
import AssignmentEditor from "../../components/assignments/AssignmentEditor";

const AllAssignments: NextPage = ({assignment}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    return (
       <AssignmentEditor assignemnt={assignment}/>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const token = await GetGamajunAccessToken(context);

    const assignment = await GetAssignment(String(context?.params?.assignmentId) ,token);

    return {
        props: {
            assignment: assignment
        }, // will be passed to the page component as props
    }
}

export default AllAssignments