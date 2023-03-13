import {Flex, Grid, Paper, Tabs, Title, Text, createStyles, Group, Center, Box} from '@mantine/core';
import {
    ExamSubmission,
    SandboxSubmission,
    SandboxSubmissionsByIdQuery,
    SubmissionByIdQuery, ValidatorReport
} from "../../client/generated/generated-types";
import {IconPhoto, IconSettings} from "@tabler/icons";
import SubmissionDisplay from "./SubmissionDisplay";
import ValidatorResults from "../validatorReport/ValidatorResults";
import Head from "next/head";
import React from "react";
import GradingResult from "../grading/GradingResult";

interface SubmissionViewerProps {
    submission: SubmissionByIdQuery['examSubmissionById'] | SandboxSubmissionsByIdQuery['sandboxSubmissionById']
}

const SubmissionViewer = ({submission}: SubmissionViewerProps) => {
        return (
        <div>
            <Head>
                <title>{submission?.assignment.title} | Gamajun</title>
            </Head>
            <Tabs defaultValue={"submission"}>
                <Tabs.List>
                    <Tabs.Tab value="submission" icon={<IconPhoto size={14}/>}>Odevzdání</Tabs.Tab>
                    <Tabs.Tab value="results" icon={<IconSettings size={14}/>}>Výsledky</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="submission" pt="xs">
                    <SubmissionDisplay submission={submission}/>
                </Tabs.Panel>

                <Tabs.Panel value="results" pt="xs">
                    {submission?.__typename == "ExamSubmission" && <GradingResult submission={submission}/>}

                    <ValidatorResults validatorReport={submission?.validatorReport as ValidatorReport}/>
                </Tabs.Panel>

            </Tabs>
        </div>
    );
}

export default SubmissionViewer