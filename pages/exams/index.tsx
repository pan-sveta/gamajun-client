import {GetServerSideProps, InferGetServerSidePropsType, NextPage} from "next";
import {getAllAssignments, getAllExams, getGamajunAccessToken} from "../../api/GamajunAPI";
import {Assignment, Exam, ExamFromJSON} from "../../types/gamajun.ts";
import Link from "next/link";
import {Button, Group, Stack, Table, Title} from "@mantine/core";
import {IconPlus} from "@tabler/icons";

const Exams: NextPage = ({exams}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    //Fix protože next neumí ze SSP poslat date type, tak to posílám jako JSON a typuju až tady
    // @ts-ignore
    exams = exams.map(exam => ExamFromJSON(exam));

    const rows = exams.map((exams: Exam) => (
        <Link key={exams.id} href={`/exams/${exams.id}`}>
            <tr key={exams.id}>
                <td>{exams.id}</td>
                <td>{exams.title}</td>
                <td>{exams.author}</td>
                <td>{exams.accessibleFrom?.toLocaleDateString()}</td>
                <td>{exams.accessibleFrom?.toLocaleDateString()}</td>
            </tr>
        </Link>
    ));

    return (
        <Stack>
            <Title order={1}>Zkoušky</Title>
            <Group position="right">
                <Link href={"/exams/new"}>
                    <Button leftIcon={<IconPlus/>} color={"green"}>Nová zkouška</Button>
                </Link>
            </Group>
            <Table fontSize={"md"} striped highlightOnHover>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Popis</th>
                    <th>Autor</th>
                    <th>Dostupné od</th>
                    <th>Dostupné do</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </Stack>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const token = await getGamajunAccessToken(context);

    const exams = await getAllExams(token);

    return {
        props: {
            exams: exams
        },
    }
}

export default Exams