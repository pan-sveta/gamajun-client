import {NextPage} from "next";
import {Alert, Center, Stack, Text} from "@mantine/core";
import {useSandboxAssignmentsQuery} from "../../client/generated/generated-types";
import GamajunLoader from "../../components/common/GamajunLoader";
import SandboxCard from "../../components/sandbox/SandboxCard";
import Head from "next/head";
import {IconAlertCircle} from "@tabler/icons";
import React from "react";

const Exams: NextPage = () => {
    const {data, loading, error} = useSandboxAssignmentsQuery();

    if (loading)
        return <GamajunLoader/>;

    if (error)
        return <Alert icon={<IconAlertCircle size={16}/>} title="Chyba!" color="red">{error.message}</Alert>

    if (!data || data?.sandboxAssignments?.length < 1)
        return <Text fz={"xl"} ta={"center"} color={"gray"} mt={"15vh"}>Žádné dostupné sandbox zadání</Text>


    const cards = data?.sandboxAssignments.map(ass => <SandboxCard key={ass.id} assignment={ass}/>)

    return (
        <Stack>
            <Head>
                <title>Sandbox | Gamajun</title>
            </Head>
            {cards}
        </Stack>
    );
}
export default Exams