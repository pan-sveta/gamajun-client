import React from 'react';
import {NextPage} from "next";
import {useRouter} from "next/router";
import {
    useAssignmentByIdQuery,
    useSandboxSubmissionsByAssignmentIdQuery
} from "../../../client/generated/generated-types";
import {Paper, Skeleton, Table, Title, useMantineTheme} from "@mantine/core";
import {IconCheck, IconEdit} from "@tabler/icons-react";
import Head from "next/head";

const Sandbox: NextPage = () => {

    const theme = useMantineTheme();
    const router = useRouter();
    const {assignmentId} = router.query

    const {data, loading, error} = useSandboxSubmissionsByAssignmentIdQuery({
        variables: {assignmentId: typeof assignmentId === 'string' ? assignmentId : "NO ID"}
    })

    const {data: assignmentData, loading: assignmentLoading, error: assignmentError} = useAssignmentByIdQuery({
        variables: {
            id: typeof assignmentId === 'string' ? assignmentId : "NO ID"
        }
    })

    const rows = data?.sandboxSubmissionsByAssignment.map(sub => {
        return (
            <tr key={sub.id}>
                <td>{sub.submittedAt ? <IconCheck color={theme.colors.green[5]}/> :
                    <IconEdit color={theme.colors.yellow[5]}/>}</td>
                <td>{sub.user.name} {sub.user.surname}</td>
                <td>{new Date(sub.startedAt).toLocaleString()}</td>
                <td>{sub.submittedAt && new Date(sub.submittedAt).toLocaleString()}</td>
            </tr>
        )
    })


    return (
        <div>
            <Head>
                <title>{assignmentData?.assignmentById.title} | Gamajun</title>
            </Head>
            {assignmentLoading ?
                <Skeleton height={70} mb="xl"/>
                :
                <div>
                    <Title order={1}>{assignmentData?.assignmentById?.title}</Title>
                    <Title order={2} color={"gray"}>Sanbox</Title>
                </div>
            }

            {
                loading ? <Skeleton height={600} my={"md"}/> :
                    <Paper shadow="xs" p="md" my={"md"} withBorder>
                        <Title order={2} size={"h2"} mb={"md"}>Vyzkoušelo ({data?.sandboxSubmissionsByAssignment.length} pokusů)</Title>

                        <Table striped highlightOnHover withBorder>
                            <thead>
                            <tr>
                                <th>Stav</th>
                                <th>Uživatel</th>
                                <th>Zahájeno</th>
                                <th>Odevzdáno</th>
                            </tr>
                            </thead>
                            <tbody>{rows}</tbody>
                        </Table>
                    </Paper>

            }
        </div>
    );
};

export default Sandbox;