import {Alert, Grid, Notification, Stack, Title, Paper} from "@mantine/core";
import {useValidatorReportByExamSubmissionIdQuery} from "../../client/generated/generated-types";
import GamajunLoader from "../common/GamajunLoader";
import {ReactNode} from "react";
import {IconCheck, IconCross, IconX} from "@tabler/icons";
import ValidatorRuleResultCard from "./ValidatorRuleResultCard";

interface ValidatorResultsProps {
    submissionId: string
}

const ValidatorResults = ({submissionId}: ValidatorResultsProps) => {

    const {data, loading, error} = useValidatorReportByExamSubmissionIdQuery({
        variables: {
            id: submissionId
        }
    });

    if (loading || !data?.validatorReportByExamSubmissionId)
        return <GamajunLoader/>

    const cards = data.validatorReportByExamSubmissionId.validatorRuleResults.map(res => <ValidatorRuleResultCard key={res.id} validatorRuleResult={res}/>)

    return (
        <Grid>
            <Grid.Col span={6}>
                <Paper shadow="xs" p="xl">
                    <Title order={2} mb={"md"}>Výsledky validátoru</Title>
                    <Stack spacing={"sm"}>
                        {cards}
                    </Stack>
                </Paper>
            </Grid.Col>
            <Grid.Col span={6}>
                <Title order={2} mb={"md"}>Bodování</Title>
            </Grid.Col>
        </Grid>
    )

}

export default ValidatorResults