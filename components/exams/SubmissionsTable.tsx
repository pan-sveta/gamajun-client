import {useExamsQuery, useSubmissionsByExamIdQuery} from "../../client/generated/generated-types";
import {Skeleton, Table} from "@mantine/core";
import Link from "next/link";
import {useRouter} from "next/router";
import exams from "../../pages/exams";

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
            <Link key={sub.id} href={`/submission/${sub.id}/grading`}>
                <tr>
                    <td>{sub.author}</td>
                    <td>{sub.assignment?.title}</td>
                    <td>{sub.startedAt}</td>
                    <td>{sub.submittedAt}</td>
                </tr>
            </Link>
        ));
    }

    return (
        <Skeleton visible={loading}>
            <Table fontSize={"md"} striped={true} highlightOnHover={true}>
                <thead>
                <tr>
                    <th>Autor</th>
                    <th>Zadání</th>
                    <th>Zahájení</th>
                    <th>Odevzdáno</th>
                </tr>
                </thead>
                <tbody>
                {rows()}
                </tbody>
            </Table>
        </Skeleton>
    );
}

export default SubmissionsTable