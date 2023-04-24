import {Alert, Menu, Text} from "@mantine/core";
import Link from "next/link";
import {IconAlertCircle, IconEdit, IconReportAnalytics} from "@tabler/icons";
import {ExamsQuery, useExamsQuery} from "../../client/generated/generated-types";
import React, {useMemo} from "react";
import {MantineReactTable, MRT_ColumnDef} from "mantine-react-table";
import {MRT_Localization_CS} from "mantine-react-table/locales/cs";

const ExamsTable = () => {
    const {data, error, loading} = useExamsQuery();
    const columns = useMemo<MRT_ColumnDef<ExamsQuery["exams"][0]>[]>(
        () => [
            {
                header: 'Název',
                accessorFn: ({title}) => <Text fw={"bold"}>{title}</Text>,
            },
            {
                accessorKey: 'id',
                header: 'Id',
            },
            {
                accessorFn: ({author}) => `${author.name} ${author.surname}`,
                header: 'Autor',
            },
            {
                accessorKey: 'accessibleFrom',
                header: 'Dostupné od',
                //@ts-ignore
                Cell: ({renderedCellValue}) => <Text>{new Date(renderedCellValue).toLocaleString()}</Text>,
            },
            {
                accessorKey: 'accessibleTo',
                header: 'Dostupné do',
                //@ts-ignore
                Cell: ({renderedCellValue}) => <Text>{new Date(renderedCellValue).toLocaleString()}</Text>,
            }
        ],
        [],
    );

    if (error)
        return <Alert icon={<IconAlertCircle size={16}/>} title="Chyba!" color="red">{error.message}</Alert>

    return (
        <MantineReactTable
            columns={columns}
            data={data?.exams ?? []}
            enableColumnOrdering
            enableGlobalFilter={false}
            mantineTableProps={{
                striped: true,
            }}
            initialState={{density: 'xs'}}
            state={{isLoading: loading}}
            enableFullScreenToggle={false}
            enableRowActions={true}
            positionActionsColumn="first"
            localization={MRT_Localization_CS}
            renderRowActionMenuItems={({row}) => (
                <>
                    <Link href={`/exams/${row.getValue("id")}/edit`}>
                        <Menu.Item color={"orange"} icon={<IconEdit/>}>Upravit</Menu.Item>
                    </Link>
                    <Link href={`/exams/${row.getValue("id")}/grading`}>
                        <Menu.Item color={"blue"} icon={<IconReportAnalytics/>}>Výsledky</Menu.Item>
                    </Link>
                </>
            )}
        />
    );
}

export default ExamsTable