import React, {ReactNode, useMemo} from 'react';
import {
    AssignmentsQuery,
    ClassroomByIdQuery,
    refetchClassroomByIdQuery,
    useRemoveUserMutation
} from "../../client/generated/generated-types";
import {ActionIcon, Alert, Button, Center, Menu, Paper, Stack, Table, Text, Title, Tooltip} from "@mantine/core";
import {IconAlertCircle, IconBeach, IconCheck, IconEdit, IconUserMinus, IconX} from "@tabler/icons";
import {showNotification} from "@mantine/notifications";
import {openConfirmModal} from "@mantine/modals";
import {MantineReactTable, MRT_ColumnDef} from "mantine-react-table";
import {MRT_Localization_CS} from "mantine-react-table/locales/cs";
import Link from "next/link";

interface StudentsTableProps {
    classroomId: ClassroomByIdQuery['classroomById']['id']
    users: ClassroomByIdQuery['classroomById']['users']
}

const StudentsTable = ({users, classroomId}: StudentsTableProps) => {

        const [removeUser, {loading, error}] = useRemoveUserMutation({
            refetchQueries: [refetchClassroomByIdQuery({id: classroomId})]
        });

        const removeUserModal = (username: string) => openConfirmModal({
            title: 'Vyloučit uživatele',
            children: (
                <Stack>
                    <Text size="sm">
                        Opravdu si přejete vyloučit uživatele {username}?
                    </Text>
                    <Alert icon={<IconAlertCircle size={16}/>} title="VAROVÁNÍ!" color="red">
                        Touto akcí dojde ke smazání uživatele a všech jeho výsledků
                    </Alert>
                </Stack>
            ),
            labels: {confirm: 'Vyloučit', cancel: 'Zrušit'},
            confirmProps: {color: 'red'},
            onConfirm: () => removeUserAction(username),
        });

        function removeUserAction(username: string) {
            removeUser({
                variables: {
                    username: username,
                    classroomId: classroomId
                }
            }).then(res => {
                showNotification({
                    title: `Úspěšně odebráno`,
                    message: `Uživatel ${username} odebrán`,
                    color: "green",
                    icon: <IconCheck/>,
                })
            })
                .catch(err => showNotification({
                    title: "Chyba při odebírání uživatele",
                    message: err.message,
                    color: "red",
                    icon: <IconX/>,
                    autoClose: false
                }));
        }

        const columns = useMemo<MRT_ColumnDef<ClassroomByIdQuery['classroomById']['users'][0]>[]>(
            () => [
                {
                    accessorKey: 'username',
                    header: 'Uživatelské jméno',
                },
                {
                    accessorFn: ({name,surname}) => `${name} ${surname}`,
                    header: 'Jméno',
                },
                {
                    accessorKey: 'email',
                    header: 'Uživatelské jméno',
                    Cell: ({renderedCellValue}) => <a href={`mailto:${renderedCellValue}`}>{renderedCellValue}</a>,
                },
            ],
            [],
        );

        if (error)
            return <Alert icon={<IconAlertCircle size={16}/>} title="Chyba!" color="red">{error.message}</Alert>

        return (
            <MantineReactTable
                columns={columns}
                data={users ?? []}
                enableColumnOrdering
                enableGlobalFilter={false}
                mantineTableProps={{
                    striped: true,
                }}
                initialState={{density: 'xs'}}
                state={{isLoading: loading}}
                enableFullScreenToggle={false}
                enableRowActions={true}
                positionActionsColumn="last"
                localization={MRT_Localization_CS}
                renderRowActions={({row}) => (
                    <Tooltip label={`Vyloučit studenta ${row.getValue("surname")}`}>
                        <Button color={"red"} loading={loading} leftIcon={<IconUserMinus/>}
                                    onClick={() => removeUserModal(row.getValue("username"))}>
                            Vyloučit uživatele
                        </Button>
                    </Tooltip>
                )}
            />
        );
    }
;

export default StudentsTable;
