import {GetServerSideProps, InferGetServerSidePropsType, NextPage} from "next";
import {GetAllAssignments, GetGamajunAccessToken} from "../../api/GamajunAPI";
import {getSession} from "next-auth/react";
import {Table} from "@mantine/core";
import Link from "next/link";

const AllAssignments: NextPage = ({assignments}: InferGetServerSidePropsType<typeof getServerSideProps>) => {


    const rows = assignments.map((element) => (
        <Link href={`/assignments/${element.id}`}>
            <tr key={element.id}>
                <td>{element.id}</td>
                <td>{element.title}</td>
                <td>{element.description}</td>
            </tr>
        </Link>
    ));

    return (
        <Table>
            <thead>
            <tr>
                <th>Název</th>
                <th>Popis</th>
            </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const token = await GetGamajunAccessToken(context);
    console.log(token)

    const assignments = await GetAllAssignments(token);

    console.log(assignments)

    return {
        props: {
            assignments: assignments
        }, // will be passed to the page component as props
    }
}

export default AllAssignments