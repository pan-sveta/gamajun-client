import React from 'react';
import {
    ClassroomByIdQuery,
    refetchClassroomsQuery,
    useDeleteClassroomMutation
} from "../../client/generated/generated-types";
import {ActionIcon, Alert, Button, Flex, Stack, Text, Title, Tooltip} from "@mantine/core";
import {IconAlertCircle, IconCheck, IconClipboardCopy, IconSkull, IconX} from "@tabler/icons";
import StudentsTable from "./StudentsTable";
import Head from "next/head";
import {openConfirmModal} from "@mantine/modals";
import {showNotification} from "@mantine/notifications";
import {useRouter} from "next/router";

interface ClassroomViewerProps {
    classroom: ClassroomByIdQuery['classroomById']
}

const ClassroomViewer = ({classroom}: ClassroomViewerProps) => {
    const router = useRouter();

    function copyLink() {
        navigator.clipboard.writeText(classroom.inviteCode).then(r => {
        });
    }

    const [deleteClassroom, {loading, error}] = useDeleteClassroomMutation({
        refetchQueries: [refetchClassroomsQuery()]
    });

    const deleteClassroomModal = () => openConfirmModal({
        title: 'Vyloučit uživatele',
        children: (
            <Stack>
                <Text size="sm">
                    Opravdu si přejete odstranit třídu {classroom.name}?
                </Text>
                <Alert icon={<IconAlertCircle size={16}/>} title="VAROVÁNÍ!" color="red">
                    Touto akcí dojde ke smazání třídy, jejich uživatelů a všech jejich dat!
                </Alert>
            </Stack>
        ),
        labels: {confirm: 'Smazat', cancel: 'Zrušit'},
        confirmProps: {color: 'dark'},
        onConfirm: () => removeClassroomAction(),
    });

    function removeClassroomAction() {
        deleteClassroom({
            variables: {
                id: classroom.id
            }
        }).then(res => {
            showNotification({
                title: `Úspěšně odstraněno`,
                message: `Třída ${classroom.name} odstraněna`,
                color: "green",
                icon: <IconCheck/>,
            })
            router.push("/classrooms");
        })
            .catch(err => showNotification({
                title: "Chyba při odstraňování třídy",
                message: err.message,
                color: "red",
                icon: <IconX/>,
                autoClose: false
            }));
    }

    if (error)
        return <Alert color="red" title="Chyba" icon={<IconAlertCircle/>}>{error.message}</Alert>

    return (
        <div>
            <Head>
                <title>{classroom.name} | Gamajun</title>
            </Head>
            <Flex justify={"space-between"} align={"center"}>
                <Stack>
                    <Title order={1}>{classroom.name}</Title>
                    <Flex align={"center"}>
                        <Text size={"xl"}>Kód pozvánky: {classroom.inviteCode}</Text>
                        <Tooltip label="Kopírovat odkaz do schránky">
                            <ActionIcon ml={"0"} color={"yellow"} onClick={() => copyLink()}>
                                <IconClipboardCopy/>
                            </ActionIcon>
                        </Tooltip>
                    </Flex>
                </Stack>
                <Button color={"dark"} leftIcon={<IconSkull/>} loading={loading} onClick={() => deleteClassroomModal()}>Odstranit</Button>
            </Flex>
            <StudentsTable users={classroom.users} classroomId={classroom.id}/>

        </div>
    );
};

export default ClassroomViewer;
