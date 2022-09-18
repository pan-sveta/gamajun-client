import {GetServerSideProps, InferGetServerSidePropsType, NextPage} from "next";
import {getAllAssignments, getGamajunAccessToken} from "../../api/GamajunAPI";
import {getSession} from "next-auth/react";
import {Group, Stack, Table, Button, Title} from "@mantine/core";
import Link from "next/link";
import {Assignment} from "../../types/gamajun.ts";
import Box from "next-auth/providers/box";
import {IconPlus} from "@tabler/icons";

const AllAssignments: NextPage = ({assignments}: InferGetServerSidePropsType<typeof getServerSideProps>) => {


    const rows = assignments.map((assignment: Assignment) => (
        <Link key={assignment.id} href={`/assignments/${assignment.id}`}>
            <tr key={assignment.id}>
                <td>{assignment.id}</td>
                <td>{assignment.title}</td>
                <td>{assignment.author}</td>
            </tr>
        </Link>
    ));

    return (
        <Stack>
            <Title order={1}>Zadání</Title>
            <Group position="right">
                <Link href={"/assignments/new"}>
                    <Button leftIcon={<IconPlus/>} color={"green"}>Nové zadání</Button>
                </Link>
            </Group>
            <Table fontSize={"md"} striped highlightOnHover>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Popis</th>
                    <th>Autor</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </Stack>
    );
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

export default AllAssignments