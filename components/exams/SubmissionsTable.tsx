import {useSubmissionsByExamIdQuery} from "../../client/generated/generated-types";
import {ActionIcon, Paper, Skeleton, Table} from "@mantine/core";
import Link from "next/link";
import {useRouter} from "next/router";
import {IconSearch} from "@tabler/icons";

const SubmissionsTable = () => {
    const router = useRouter();
    const {examId} = router.query;

    const {data, loading, error} = useSubmissionsByExamIdQuery({
        variables: {
            id: typeof examId === 'string' ? examId : "NO ID"
        }
    });

    function rows() {
        if (!data?.examSubmissionsByExamId)
            return;

        return data?.examSubmissionsByExamId.map(sub => (
            <tr key={sub.id}>
                <td>{sub.author}</td>
                <td>{sub.assignment?.title}</td>
                <td>{sub.startedAt}</td>
                <td>{sub.submittedAt}</td>
                <td>
                    <Link href={`/submissions/${sub.id}/grading`}>
                        <ActionIcon color="blue" variant="outline">
                            <IconSearch size={18}/>
                        </ActionIcon>
                    </Link>
                </td>
            </tr>
        ));
    }

    return (
        <Skeleton visible={loading}>
            <Paper shadow="xs" p="md" my={"md"} withBorder>
                <Table fontSize={"md"} striped={true} >
                    <thead>
                    <tr>
                        <th>Autor</th>
                        <th>Zadání</th>
                        <th>Zahájení</th>
                        <th>Odevzdáno</th>
                        <th>Akce</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows()}
                    </tbody>
                </Table>
            </Paper>
        </Skeleton>
    );
}

export default SubmissionsTable