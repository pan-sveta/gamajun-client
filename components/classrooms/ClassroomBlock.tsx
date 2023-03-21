import React from 'react';
import {ClassroomsQuery} from "../../client/generated/generated-types";
import {Flex, Paper, Text, Title} from "@mantine/core";
import {IconTicket, IconUsers} from "@tabler/icons";
import Link from "next/link";

interface ClassroomBlockProps {
    classroom: ClassroomsQuery['classrooms'][0]
}

const ClassroomBlock = ({classroom}: ClassroomBlockProps) => {
    return (
        <Link href={`/classrooms/${classroom.id}`}>
                <Paper shadow="xs" p="md" my={"md"} withBorder style={{"cursor":"pointer"}}>
                    <Flex align={"center"} justify={"space-between"}>
                        <Title order={2} mr={"xl"}>{classroom.name}</Title>
                        <IconUsers color={"purple"}/>
                    </Flex>
                    <Flex my={"sm"}>
                        <IconTicket color={"grey"}/>
                        <Text ml={"sm"} color={"grey"}>{classroom.inviteCode}</Text>
                    </Flex>
                    <Text>Počet studentů: {classroom.users.length}</Text>
                </Paper>
        </Link>
    );
};

export default ClassroomBlock;
