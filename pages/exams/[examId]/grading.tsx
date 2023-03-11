import SubmissionsTable from "../../../components/exams/SubmissionsTable";
import {useExamByIdQuery} from "../../../client/generated/generated-types";
import {useRouter} from "next/router";
import {Box, Group, Skeleton, Text, Title} from "@mantine/core";
import Head from "next/head";
import React from "react";

const GradingSubmissions = () => {
    const router = useRouter();
    const {examId} = router.query;

    const {data, loading, error} = useExamByIdQuery({
        variables: {
            id: typeof examId === 'string' ? examId : "NO ID"
        }
    });

    return (
        <Box>
            <Head>
                <title>{data?.examById?.title} | Gamajun</title>
            </Head>
            <Skeleton visible={loading}>
                <Group position={"apart"} mb={"5vh"}>
                    <Title order={1}>{data?.examById.title}</Title>
                    <Text size={"xl"} color={"gray"}>Známkování</Text>
                </Group>
            </Skeleton>
            <SubmissionsTable/>
        </Box>
    );
}

export default GradingSubmissions