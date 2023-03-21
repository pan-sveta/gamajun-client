import {NextPage} from "next";
import {useSubmissionByIdGradingQuery} from "../../../client/generated/generated-types";
import {useRouter} from "next/router";
import {Alert, Badge, Box, createStyles, Grid, Group, Loader, Paper, Skeleton, Text, Title} from "@mantine/core";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";
import GradeSubmission from "../../../components/grading/GradeSubmission";
import {IconAlertCircle} from "@tabler/icons";
import SubmissionStatusBadge from "../../../components/grading/SubmissionStatusBadge";


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

    if (loading)
        return <Skeleton height={"80vh"}/>


    if (error)
        return <Alert icon={<IconAlertCircle size={16}/>} title="Chyba!" color="red">{error?.message}</Alert>

    return (
        <Box>
            <Head>
                <title>{data?.examSubmissionById?.exam.title} | Gamajun</title>
            </Head>
            <Group mb={"md"}>
                <Title order={1}>Řešení
                    uživatele {data?.examSubmissionById?.user.name} {data?.examSubmissionById?.user.surname}</Title>
                <Badge color={"violet"}>Zkouška: {data?.examSubmissionById?.exam.title}</Badge>
                <Badge>Zadání: {data?.examSubmissionById?.assignment.title}</Badge>
                <SubmissionStatusBadge status={data?.examSubmissionById?.examSubmissionState}/>
            </Group>


            <Grid>
                <Grid.Col span={8}>
                    <Paper shadow="xs" p="md" withBorder>
                        <Text
                            dangerouslySetInnerHTML={{__html: data?.examSubmissionById?.assignment.description ?? "N/A"}}/>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={4}>
                    <GradeSubmission submission={data?.examSubmissionById}/>
                </Grid.Col>

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