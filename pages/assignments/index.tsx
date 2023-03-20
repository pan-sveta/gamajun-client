import {NextPage} from "next";
import {Button, Group, Stack, Title} from "@mantine/core";
import Link from "next/link";
import {IconPlus} from "@tabler/icons-react";
import AssignmentsTable from "../../components/assignments/AssignmentsTable";
import Head from "next/head";
import React from "react";

const AllAssignments: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Zadání | Gamajun</title>
            </Head>
            <Stack>
                <Group position="apart" align={"center"}>
                    <Title order={1}>Zadání</Title>
                    <Link href={"/assignments/new"}>
                        <Button leftIcon={<IconPlus/>} color={"green"}>Nové zadání</Button>
                    </Link>
                </Group>
                <AssignmentsTable/>
            </Stack>
        </div>
    );
}

export default AllAssignments