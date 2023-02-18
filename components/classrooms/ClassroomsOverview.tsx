import React from 'react';
import {useClassroomsQuery} from "../../client/generated/generated-types";
import ClassroomBlock from "./ClassroomBlock";
import classrooms from "../../pages/classrooms";
import {Alert, Button, Group, Skeleton, Stack, Title} from "@mantine/core";
import GamajunLoader from "../common/GamajunLoader";
import Link from "next/link";
import {IconAlertCircle, IconPlus} from "@tabler/icons";
import {JSXElement} from "@babel/types";

function ClassroomsOverview(): JSX.Element {
    const {data, loading, error} = useClassroomsQuery();

    if (error)
        return (
            <Alert icon={<IconAlertCircle size={16}/>} title="Chyba!" color="red">
                {error.message}
            </Alert>);

    if (loading)
        return <Skeleton height={"20vh"}/>

    let classroomsBlocks = data?.classrooms.map(c => <ClassroomBlock key={c.id} classroom={c}/>)

    return (
        <Stack>
            <Group position="apart">
                <Title order={1}>Třídy</Title>
                <Link href={"/classrooms/new"}>
                    <Button leftIcon={<IconPlus/>} color={"green"}>Nová třída</Button>
                </Link>
            </Group>
            <Group>
                {classroomsBlocks}
            </Group>
        </Stack>
    );
}

export default ClassroomsOverview;