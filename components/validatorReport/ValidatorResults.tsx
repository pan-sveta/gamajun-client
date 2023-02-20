import {Grid, Paper, Stack, Title} from "@mantine/core";
import {
    SandboxSubmissionsByIdQuery,
    SubmissionByIdQuery, ValidatorReport,
} from "../../client/generated/generated-types";
import GamajunLoader from "../common/GamajunLoader";
import ValidatorRuleResultCard from "./ValidatorRuleResultCard";

interface ValidatorResultsProps {
    validatorReport: ValidatorReport
}

const ValidatorResults = ({validatorReport}: ValidatorResultsProps) => {



    const cards = validatorReport?.validatorRuleResults.map(res => <ValidatorRuleResultCard key={res.id} validatorRuleResult={res}/>)

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