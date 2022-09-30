import {GetServerSideProps, InferGetServerSidePropsType, NextPage} from "next";
import {Button, Group, Loader, Stack, Table, Title} from "@mantine/core";
import Link from "next/link";
import {Assignment} from "../../types/gamajun.ts";
import {IconPlus} from "@tabler/icons";
import {getAllAssignments} from "../../api/GamajunAPIServer";
import {useAssignmentsQuery} from "../../client/generated/generated-types";
import AssignmentsTable from "../../components/assignments/AssignmentsTable";

const AllAssignments: NextPage = () => {
    return (
        <Stack>
            <Title order={1}>Zadání</Title>
            <Group position="right">
                <Link href={"/assignments/new"}>
                    <Button leftIcon={<IconPlus/>} color={"green"}>Nové zadání</Button>
                </Link>
            </Group>
            <AssignmentsTable/>
        </Stack>
    );
}

export default AllAssignments