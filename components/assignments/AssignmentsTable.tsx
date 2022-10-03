import {Loader, Skeleton, Table} from "@mantine/core";
import {
    CreateAssignmentMutationFn, refetchAssignmentsQuery,
    useAssignmentsQuery,
    useCreateAssignmentMutation
} from "../../client/generated/generated-types";
import Link from "next/link";
import { Center } from '@mantine/core';
import GamajunLoader from "../common/GamajunLoader";
import {ReactNode} from "react";

const AssignmentsTable = () => {
    const {data, error, loading} = useAssignmentsQuery();

    const rows = (): ReactNode => {
        if (!data?.assignments)
            return <GamajunLoader/>

        return data?.assignments.map((assignment) => (
            <Link key={assignment?.id} href={`/assignments/${assignment?.id}`}>
                <tr key={assignment?.id}>
                    <td>{assignment?.id}</td>
                    <td>{assignment?.title}</td>
                    <td>{assignment?.author}</td>
                </tr>
            </Link>
        ));
    }

    return (
        <Skeleton visible={loading}>
            <Table fontSize={"md"} striped highlightOnHover>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Popis</th>
                    <th>Autor</th>
                </tr>
                </thead>
                <tbody>{rows()}</tbody>
            </Table>
        </Skeleton>
    );
}

export default AssignmentsTable