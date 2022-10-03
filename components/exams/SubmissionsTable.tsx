import {useExamsQuery, useSubmissionsByExamIdQuery} from "../../client/generated/generated-types";
import {Skeleton, Table, Paper, ActionIcon} from "@mantine/core";
import Link from "next/link";
import {useRouter} from "next/router";
import exams from "../../pages/exams";
import {IconReportAnalytics, IconSearch} from "@tabler/icons";

const SubmissionsTable = () => {
    const router = useRouter();
    const {examId} = router.query;

    console.log(examId)

    const {data, loading, error} = useSubmissionsByExamIdQuery({
        variables: {
            id: typeof examId === 'string' ? examId : "NO ID"
        }
    });

    console.log(data)

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