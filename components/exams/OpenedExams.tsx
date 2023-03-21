import {useOpenedExamsQuery} from "../../client/generated/generated-types";
import {Alert, Center, Skeleton, Stack, Text} from "@mantine/core";
import ExamCard from "./ExamCard";
import {IconAlertCircle} from "@tabler/icons";
import React from "react";

const OpenedExams = () => {
    let {data, loading, error} = useOpenedExamsQuery()

    if (error)
        return <Alert icon={<IconAlertCircle size={16}/>} title="Chyba!" color="red">{error.message}</Alert>

    const openedExamsCards = () => {
        if (!data?.openedExams)
            return null;
        else if (data.openedExams.length < 1)
            return (
                <Center mih={"10vh"}>
                    <Text color={"gray"}>Žádné zkoušky</Text>
                </Center>
            );
        else
            return (
                data?.openedExams.map(exam => <ExamCard key={exam.id} exam={exam}/>)
            )
    }

    return (
        <div>
            <h2>Dostupné zkoušky</h2>
            <Stack>
                {loading ? <Skeleton height={"10vh"}/> : openedExamsCards()}
            </Stack>
        </div>
    );
}

export default OpenedExams