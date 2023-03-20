import React, {ReactNode} from 'react';
import {
    ClassroomByIdQuery,
    refetchClassroomByIdQuery,
    useRemoveUserMutation
} from "../../client/generated/generated-types";
import {ActionIcon, Alert, Center, Paper, Stack, Table, Text, Title, Tooltip} from "@mantine/core";
import {IconAlertCircle, IconCheck, IconUserMinus, IconX} from "@tabler/icons-react";
import {showNotification} from "@mantine/notifications";
import {openConfirmModal} from "@mantine/modals";

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
                        Touto akcí dojde ke smazání uživatele a všech výsledků
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

        if (users.length < 1)
            return (
                <Center>
                    <Text color={"gray"}>Žádní registrovaní studenti</Text>
                </Center>
            )

        const rows = (): ReactNode => {
            return users?.map((user) => (
                <tr key={user.username}>
                    <td>{user.username}</td>
                    <td>{user.name} {user?.surname}</td>
                    <td><a href={`mailto:${user?.email}`}>{user.email}</a></td>
                    <td>
                        <Tooltip label={`Vyloučit studenta ${user.surname}`}>
                            <ActionIcon color={"red"} variant={"outline"} loading={loading}
                                        onClick={() => removeUserModal(user.username)}>
                                <IconUserMinus/>
                            </ActionIcon>
                        </Tooltip>
                    </td>
                </tr>

            ));
        }

        return (
            <Paper shadow="xs" p="md" my={"md"} withBorder>
                <Title order={2} mb={"md"}>Studenti</Title>
                <Table fontSize={"md"} striped>
                    <thead>
                    <tr>
                        <th>Uživatelské jméno</th>
                        <th>Jméno</th>
                        <th>Email</th>
                        <th>Akce</th>
                    </tr>
                    </thead>
                    <tbody>{rows()}</tbody>
                </Table>
            </Paper>

        );
    }
;

export default StudentsTable;
