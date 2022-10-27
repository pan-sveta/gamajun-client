import React from 'react';
import {NextPage} from "next";
import {useRouter} from "next/router";
import {
    useAssignmentByIdQuery,
    useAssignmentSandboxSubmissionsQuery,
    useSandboxAssignmentsQuery
} from "../../../client/generated/generated-types";
import GamajunLoader from "../../../components/common/GamajunLoader";
import {Paper, Skeleton, Table, Title, useMantineTheme} from "@mantine/core";
import {IconBeach, IconCheck, IconCross, IconEdit} from "@tabler/icons";

const Sandbox: NextPage = () => {
    const theme = useMantineTheme();
    const router = useRouter();
    const {assignmentId} = router.query

    const {data, loading, error} = useAssignmentSandboxSubmissionsQuery({
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
                <td>{sub.author}</td>
                <td>{new Date(sub.startedAt).toLocaleString()}</td>
                <td>{sub.submittedAt && new Date(sub.submittedAt).toLocaleString()}</td>
            </tr>
        )
    })


    return (
        <div>
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
                        <Title order={2} size={"h2"} mb={"md"}>Vyzkoušelo ({data?.sandboxSubmissionsByAssignment.length} lidí)</Title>

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