import {NextPage} from "next";
import {Button, Group, Stack, Title} from "@mantine/core";
import Link from "next/link";
import {IconPlus} from "@tabler/icons";
import AssignmentsTable from "../../components/assignments/AssignmentsTable";

const AllAssignments: NextPage = () => {
    return (
        <Stack>
            <Group position="apart" align={"center"}>
                <Title order={1}>Zadání</Title>
                <Link href={"/assignments/new"}>
                    <Button leftIcon={<IconPlus/>} color={"green"}>Nové zadání</Button>
                </Link>
            </Group>
            <AssignmentsTable/>
        </Stack>
    );
}

export default AllAssignments