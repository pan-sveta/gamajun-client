import {SubmissionByIdQuery, useSubmissionsByExamIdQuery} from "../../client/generated/generated-types";
import {Alert, Button, Paper, Skeleton, Table, Text} from "@mantine/core";
import Link from "next/link";
import {useRouter} from "next/router";
import {IconAlertCircle, IconSearch} from "@tabler/icons";
import SubmissionStatusBadge from "../grading/SubmissionStatusBadge";
import React, {useMemo} from "react";
import {MantineReactTable, MRT_ColumnDef} from "mantine-react-table";
import {MRT_Localization_CS} from "mantine-react-table/locales/cs";

const SubmissionsTable = () => {
    const router = useRouter();
    const {examId} = router.query;

    const {data, loading, error} = useSubmissionsByExamIdQuery({
        variables: {
            id: typeof examId === 'string' ? examId : "NO ID"
        }
    });

    //@ts-ignore
    const columns = useMemo<MRT_ColumnDef<SubmissionByIdQuery["examSubmissionById"]>[]>(
        () => [
            {
                accessorKey: 'id',
                header: 'Id',

            },
            {
                accessorFn: (row) => `${row?.user.name} ${row?.user.surname}`,
                header: 'Autor',
            },
            {
                accessorKey: 'assignment.title',
                header: 'Zadání',
            },
            {
                accessorKey: 'startedAt',
                header: 'Zahájeno v',
                //@ts-ignore
                Cell: ({renderedCellValue}) => <Text>{new Date(renderedCellValue).toLocaleString()}</Text>,
            },
            {
                accessorKey: 'submittedAt',
                header: 'Odevzdáno v',
                //@ts-ignore
                Cell: ({renderedCellValue}) => <Text>{new Date(renderedCellValue).toLocaleString()}</Text>,
            },
            {
                accessorKey: 'examSubmissionState',
                header: 'Stav',
                //@ts-ignore
                Cell: ({renderedCellValue}) => <SubmissionStatusBadge status={renderedCellValue}/>
            },
        ],
        [],
    );

    if (error)
        return <Alert icon={<IconAlertCircle size={16}/>} title="Chyba!" color="red">{error.message}</Alert>

    return (
        <MantineReactTable
            //@ts-ignore
            columns={columns}
            data={data?.examSubmissionsByExamId ?? []}
            enableColumnOrdering
            enableGlobalFilter={false}
            mantineTableProps={{
                striped: true,
            }}
            initialState={{density: 'xs', columnVisibility: {id: false}}}
            state={{isLoading: loading}}
            enableFullScreenToggle={false}
            enableRowActions={true}
            positionActionsColumn="last"
            localization={MRT_Localization_CS}
            renderRowActions={({row}) => (
                <>
                    <Link href={`/submissions/${row.getValue("id")}/grading`}>
                        <Button color="blue" variant="outline" leftIcon={<IconSearch/>}>
                            Ohodnotit
                        </Button>
                    </Link>
                </>
            )}
        />
    );

    function rows() {
        if (!data?.examSubmissionsByExamId)
            return;

        return data?.examSubmissionsByExamId.map(sub => (
            <tr key={sub.id}>
                <td>{sub.user.name} {sub.user.surname}</td>
                <td>{sub.assignment?.title}</td>
                <td>{sub.startedAt}</td>
                <td>{sub.submittedAt}</td>
                <td><SubmissionStatusBadge status={sub.examSubmissionState}/></td>
                <td>

                </td>
            </tr>
        ));
    }

    return (
        <Skeleton visible={loading}>
            <Paper shadow="xs" p="md" my={"md"} withBorder>
                <Table fontSize={"md"} striped={true}>
                    <thead>
                    <tr>
                        <th>Autor</th>
                        <th>Zadání</th>
                        <th>Zahájení</th>
                        <th>Odevzdáno</th>
                        <th>Status</th>
                        <th>Akce</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows()}
                    </tbody>
                </Table>
            </Paper>
        </Skeleton>
    );
}

export default SubmissionsTable