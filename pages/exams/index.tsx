import {NextPage} from "next";
import Link from "next/link";
import {Button, Group, Stack, Title} from "@mantine/core";
import {IconPlus} from "@tabler/icons";
import ExamsTable from "../../components/exams/ExamsTable";

const Exams: NextPage = () => {
    return (
        <Stack>
            <Group position="apart">
                <Title order={1}>Zkoušky</Title>
                <Link href={"/exams/new"}>
                    <Button leftIcon={<IconPlus/>} color={"green"}>Nová zkouška</Button>
                </Link>
            </Group>
            <ExamsTable/>
        </Stack>
    );
}
export default Exams