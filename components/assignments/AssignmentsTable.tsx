import {ActionIcon, Alert, Group, Paper, Skeleton, Table, useMantineTheme} from "@mantine/core";
import {useAssignmentsQuery} from "../../client/generated/generated-types";
import Link from "next/link";
import GamajunLoader from "../common/GamajunLoader";
import React, {ReactNode} from "react";
import {IconAlertCircle, IconBeach, IconEdit} from "@tabler/icons";

const AssignmentsTable = () => {
    const {data, error, loading} = useAssignmentsQuery();
    const theme = useMantineTheme();

    const rows = (): ReactNode => {
        if (!data?.assignments)
            return <GamajunLoader/>

        return data?.assignments.map((assignment) => (
            <tr key={assignment?.id}>
                <td>
                    {assignment?.title}
                    {assignment.sandbox &&
                    <IconBeach style={{position: "absolute"}} color={theme.colors.yellow[4]}/>}</td>
                <td>{assignment?.id}</td>
                <td>{assignment?.author.name} {assignment?.author.surname}</td>
                <td>
                    <Group spacing={"xs"}>
                        <Link href={`/assignments/${assignment?.id}`}>
                            <ActionIcon color="orange" variant="outline">
                                <IconEdit size={18}/>
                            </ActionIcon>
                        </Link>
                        {
                            assignment.sandbox &&
                            <Link href={`/assignments/${assignment?.id}/sandbox`}>
                                <ActionIcon color={"yellow"} variant="outline">
                                    <IconBeach size={18}/>
                                </ActionIcon>
                            </Link>
                        }
                    </Group>
                </td>
            </tr>

        ));
    }

    if (error)
        return <Alert icon={<IconAlertCircle size={16}/>} title="Chyba!" color="red">{error.message}</Alert>

    if (loading)
        return <Skeleton height={"25vh"}/>

    return (
            <Paper shadow="xs" p="md" my={"md"} withBorder>
                <Table fontSize={"md"} striped>
                    <thead>
                    <tr>
                        <th>Popis</th>
                        <th>Id</th>
                        <th>Autor</th>
                        <th>Akce</th>
                    </tr>
                    </thead>
                    <tbody>{rows()}</tbody>
                </Table>
            </Paper>
    );
}

export default AssignmentsTable