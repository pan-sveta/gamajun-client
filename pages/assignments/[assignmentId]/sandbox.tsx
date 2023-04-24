import React, {useMemo} from 'react';
import {NextPage} from "next";
import {useRouter} from "next/router";
import {
    ClassroomByIdQuery, SandboxSubmissionsByAssignmentIdQuery,
    useAssignmentByIdQuery,
    useSandboxSubmissionsByAssignmentIdQuery
} from "../../../client/generated/generated-types";
import {Button, Paper, Skeleton, Table, Text, Title, Tooltip, useMantineTheme} from "@mantine/core";
import {IconCheck, IconEdit, IconUserMinus} from "@tabler/icons";
import Head from "next/head";
import {MantineReactTable, MRT_ColumnDef} from "mantine-react-table";
import {MRT_Localization_CS} from "mantine-react-table/locales/cs";

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

    const columns = useMemo<MRT_ColumnDef<SandboxSubmissionsByAssignmentIdQuery['sandboxSubmissionsByAssignment'][0]>[]>(
        () => [
            {
                header: 'Jméno',
                accessorFn: ({user}) => `${user.name} ${user.surname}`,
            },
            {
                accessorKey: 'user.username',
                header: 'Uživatelské jméno',
            },
            {
                accessorKey: 'startedAt',
                header: 'Zahájeno',
                // @ts-ignore
                Cell: ({renderedCellValue}) => <Text>{new Date(renderedCellValue).toLocaleString()}</Text>,
            },
            {
                accessorKey: 'submittedAt',
                header: 'Odevzdáno',
                // @ts-ignore
                Cell: ({renderedCellValue}) => <Text>{renderedCellValue ? new Date(renderedCellValue).toLocaleString() : "N/A"}</Text>,
            }
        ],
        [],
    );


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
                        <Title order={2} size={"h2"} mb={"md"}>Pokusy ({data?.sandboxSubmissionsByAssignment.length})</Title>

                        <MantineReactTable
                            columns={columns}
                            data={data?.sandboxSubmissionsByAssignment ?? []}
                            enableColumnOrdering
                            enableGlobalFilter={false}
                            mantineTableProps={{
                                striped: true,
                            }}
                            initialState={{density: 'xs'}}
                            state={{isLoading: loading}}
                            enableFullScreenToggle={false}
                            positionActionsColumn="last"
                            localization={MRT_Localization_CS}
                        />
                    </Paper>

            }
        </div>
    );
};

export default Sandbox;