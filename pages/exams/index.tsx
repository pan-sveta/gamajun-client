import {GetServerSideProps, InferGetServerSidePropsType, NextPage} from "next";
import {Exam, ExamFromJSON} from "../../types/gamajun.ts";
import Link from "next/link";
import {Button, Group, Stack, Table, Title} from "@mantine/core";
import {IconPlus} from "@tabler/icons";
import {getAllExams} from "../../api/GamajunAPIServer";
import ExamsTable from "../../components/exams/ExamsTable";

const Exams: NextPage = () => {
    return (
        <Stack>
            <Title order={1}>Zkoušky</Title>
            <Group position="right">
                <Link href={"/exams/new"}>
                    <Button leftIcon={<IconPlus/>} color={"green"}>Nová zkouška</Button>
                </Link>
            </Group>
            <ExamsTable/>
        </Stack>
    );
}
export default Exams