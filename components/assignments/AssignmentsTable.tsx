import {Loader, Skeleton, Table, Paper, ActionIcon} from "@mantine/core";
import {
    CreateAssignmentMutationFn, refetchAssignmentsQuery,
    useAssignmentsQuery,
    useCreateAssignmentMutation
} from "../../client/generated/generated-types";
import Link from "next/link";
import {Center} from '@mantine/core';
import GamajunLoader from "../common/GamajunLoader";
import {ReactNode} from "react";
import {IconEdit, IconReportAnalytics, IconSearch} from "@tabler/icons";

const AssignmentsTable = () => {
    const {data, error, loading} = useAssignmentsQuery();

    const rows = (): ReactNode => {
        if (!data?.assignments)
            return <GamajunLoader/>

        return data?.assignments.map((assignment) => (
                <tr key={assignment?.id}>
                    <td>{assignment?.id}</td>
                    <td>{assignment?.title}</td>
                    <td>{assignment?.author}</td>
                    <td>
                        <Link href={`/assignments/${assignment?.id}`}>
                            <ActionIcon color="orange" variant="outline">
                                <IconEdit size={18}/>
                            </ActionIcon>
                        </Link>
                    </td>
                </tr>

        ));
    }

    return (
        <Skeleton visible={loading}>
            <Paper shadow="xs" p="md" my={"md"} withBorder>
                <Table fontSize={"md"} striped>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Popis</th>
                        <th>Autor</th>
                        <th>Akce</th>
                    </tr>
                    </thead>
                    <tbody>{rows()}</tbody>
                </Table>
            </Paper>
        </Skeleton>
    );
}

export default AssignmentsTable