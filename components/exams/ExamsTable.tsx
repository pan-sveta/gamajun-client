import {ActionIcon, Group, Paper, Skeleton, Table} from "@mantine/core";
import Link from "next/link";
import {IconPencil, IconReportAnalytics} from "@tabler/icons";
import {useExamsQuery} from "../../client/generated/generated-types";
import {ReactNode} from "react";

const ExamsTable = () => {
    const {data, error, loading} = useExamsQuery();
    const exams = (): ReactNode => {
        if (!data?.exams)
            return;

        return data?.exams.map((exams) => (

            <tr key={exams?.id}>
                <td>{exams?.id}</td>
                <td>{exams?.title}</td>
                <td>{exams?.author}</td>
                <td>{new Date(exams?.accessibleFrom ?? "N/A").toLocaleString()}</td>
                <td>{new Date(exams?.accessibleTo ?? "N/A").toLocaleString()}</td>
                <td>
                    <Group spacing={"sm"}>
                        <Link key={exams?.id} href={`/exams/${exams?.id}/edit`}>
                            <ActionIcon color="orange" variant="outline">
                                <IconPencil size={18}/>
                            </ActionIcon>
                        </Link>
                        <Link key={exams?.id} href={`/exams/${exams?.id}/grading`}>
                            <ActionIcon color="blue" variant="outline">
                                <IconReportAnalytics size={18}/>
                            </ActionIcon>
                        </Link>
                    </Group>
                </td>
            </tr>

        ));

    }

    return (
        <Skeleton visible={loading}>
            <Paper shadow="xs" p="md" my={"md"} withBorder>
                <Table fontSize={"md"} striped highlightOnHover>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Popis</th>
                        <th>Autor</th>
                        <th>Dostupné od</th>
                        <th>Dostupné do</th>
                        <th>Akce</th>
                    </tr>
                    </thead>
                    <tbody>
                    {exams()}
                    </tbody>
                </Table>
            </Paper>
        </Skeleton>
    )
}

export default ExamsTable