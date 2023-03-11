import React from 'react';
import {ClassroomByIdQuery} from "../../client/generated/generated-types";
import {ActionIcon, Flex, Group, Paper, Stack, Text, Title, Tooltip} from "@mantine/core";
import {IconClipboardCopy} from "@tabler/icons";
import StudentsTable from "./StudentsTable";
import Head from "next/head";

interface ClassroomViewerProps {
    classroom: ClassroomByIdQuery['classroomById']
}

const ClassroomViewer = ({classroom}: ClassroomViewerProps) => {
    function copyLink() {
        navigator.clipboard.writeText(classroom.inviteCode).then(r => {});
    }

    return (
        <div>
            <Head>
                <title>{classroom.name} | Gamajun</title>
            </Head>
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
                <StudentsTable users={classroom.users} classroomId={classroom.id}/>
            </Stack>
        </div>
    );
};

export default ClassroomViewer;
