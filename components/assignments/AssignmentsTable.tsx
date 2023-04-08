import {ActionIcon, Alert, Box, Button, Group, Menu, Paper, Skeleton, Table, Text, useMantineTheme} from "@mantine/core";
import {AssignmentsQuery, useAssignmentsQuery} from "../../client/generated/generated-types";
import Link from "next/link";
import GamajunLoader from "../common/GamajunLoader";
import React, {ReactNode, useMemo} from "react";
import {IconAlertCircle, IconBeach, IconCheck, IconCross, IconEdit, IconX} from "@tabler/icons";
import {MantineReactTable, MRT_ColumnDef} from "mantine-react-table";
import {MRT_Localization_CS} from "mantine-react-table/locales/cs";

const AssignmentsTable = () => {
    const {data, error, loading} = useAssignmentsQuery();

    const columns = useMemo<MRT_ColumnDef<AssignmentsQuery["assignments"][0]>[]>(
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
                accessorKey: 'sandbox',
                header: 'Sandboxové zadání?',
                Cell: ({renderedCellValue}) => renderedCellValue ? <IconCheck color={"green"}/> : <IconX color={"red"}/>,
            }
        ],
        [],
    );

    if (error)
        return <Alert icon={<IconAlertCircle size={16}/>} title="Chyba!" color="red">{error.message}</Alert>

    return (
        <MantineReactTable
            columns={columns}
            data={data?.assignments ?? []}
            enableColumnOrdering
            enableGlobalFilter={false}
            mantineTableProps={{
                striped: true,
            }}
            initialState={{ density: 'xs' }}
            state={{ isLoading: loading }}
            enableFullScreenToggle={false}
            enableRowActions={true}
            positionActionsColumn="first"
            localization={MRT_Localization_CS}
            renderRowActionMenuItems={({row}) => (
                <>
                    <Link href={`/assignments/${row.getValue("id")}`}>
                        <Menu.Item icon={<IconEdit />}>Upravit</Menu.Item>
                    </Link>
                    {row.getValue("sandbox") &&
                        <Link href={`/assignments/${row.getValue("id")}/sandbox`}>
                            <Menu.Item color={"yellow"} icon={<IconBeach />}>Sandbox přehled</Menu.Item>
                        </Link>
                    }
                </>
            )}
        />
    );
}

export default AssignmentsTable