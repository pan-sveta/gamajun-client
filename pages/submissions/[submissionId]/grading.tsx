import {NextPage} from "next";
import {useSubmissionByIdGradingQuery} from "../../../client/generated/generated-types";
import {useRouter} from "next/router";
import {Badge, Box, createStyles, Grid, Group, Loader, Paper, Text, Title} from "@mantine/core";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";


const BpmnViewer = dynamic(() => {
    // @ts-ignore
    return import("../../../components/bpmn/modeler/BpmnViewer");
}, {
    loading: () => <Loader variant="bars"/>,
    ssr: false
});

const useStyles = createStyles((theme) => ({
    bpmnViewer: {
        borderColor: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[7],
        borderStyle: "solid",
        borderRadius: "5px",
        backgroundColor: "white",
    }
}));

const SubmissionGrading: NextPage = () => {
    const {classes} = useStyles();
    const router = useRouter();
    const {submissionId} = router.query;

    const {data, loading, error} = useSubmissionByIdGradingQuery({
        variables: {
            id: typeof submissionId === 'string' ? submissionId : "NO ID"
        }
    });

    return (
        <Box>
            <Head>
                <title>{data?.examSubmissionById?.exam.title} | Gamajun</title>
            </Head>
            <Group>
                <Title order={1}>Řešení uživatele {data?.examSubmissionById?.user.name} {data?.examSubmissionById?.user.surname}</Title>
                <Badge color={"green"}>Zkouška: {data?.examSubmissionById?.exam.title}</Badge>
                <Badge>Zadání: {data?.examSubmissionById?.assignment.title}</Badge>
            </Group>

            <Paper shadow="xs" p="md" my={"md"} withBorder>
                <Text dangerouslySetInnerHTML={{__html: data?.examSubmissionById?.assignment.description ?? "N/A"}}
                      mb={"5vh"}/>
            </Paper>
            <Grid>
                <Grid.Col span={6}>
                    <Paper shadow="xs" p="md" withBorder>
                        <Text align={"center"} weight={"bold"}>Referenční řešení</Text>
                        <BpmnViewer xml={data?.examSubmissionById?.assignment.xml}/>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Paper shadow="xs" p="md" withBorder>
                        <Text align={"center"} weight={"bold"}>Uživatelské řešení</Text>
                        {data?.examSubmissionById?.xml ? <BpmnViewer xml={data?.examSubmissionById?.xml}/> :
                            <Text>No filled yet</Text>}
                    </Paper>
                </Grid.Col>
            </Grid>
        </Box>
    );
}

export default SubmissionGrading