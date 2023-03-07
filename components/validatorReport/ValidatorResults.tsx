import {
    Alert,
    Box,
    createStyles,
    Divider,
    Flex,
    Grid,
    Group,
    Paper,
    Stack,
    Text,
    ThemeIcon,
    Title
} from "@mantine/core";
import {ReferenceMatchingResultState, ValidatorReport,} from "../../client/generated/generated-types";
import ValidatorRuleResultCard from "./ValidatorRuleResultCard";
import {IconAlertCircle, IconAlertTriangle, IconCheck, IconDiscountCheck, IconX} from "@tabler/icons";

const useStyles = createStyles((theme) => ({
    box: {
        border: 1,
        borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[4],
        borderStyle: "solid",
        borderRadius: "5px",
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    }
}))

interface ValidatorResultsProps {
    validatorReport: ValidatorReport
}

const ValidatorResults = ({validatorReport}: ValidatorResultsProps) => {
    const {classes} = useStyles();

    const cards = validatorReport?.validatorRuleResults.map(res => <ValidatorRuleResultCard key={res.id}
                                                                                            validatorRuleResult={res}/>)

    const overallResult = () => {
        switch (validatorReport.referenceMatchingResult.result) {
            case ReferenceMatchingResultState.FullMatch:
                return (
                    <Group className={classes.box} px={20} py={5}>
                        <ThemeIcon variant="filled" radius="xl" size="lg" color="green">
                            <IconCheck size={20}/>
                        </ThemeIcon>
                        <Text fz={"xl"} fw={"bolder"}>Úplná shoda</Text>
                    </Group>
                );
            case ReferenceMatchingResultState.PartialMatch:
                return (
                    <Group className={classes.box} px={20} py={5}>
                        <IconAlertTriangle color={"orange"} size={20}/>
                        <Text fz={"xl"} fw={"bolder"}>Částečná shoda</Text>
                    </Group>
                )
            case ReferenceMatchingResultState.NoMatch:
                return (
                    <Group className={classes.box} px={20} py={5}>
                        <ThemeIcon variant="filled" radius="xl" size="lg" color="red">
                            <IconX size={20}/>
                        </ThemeIcon>
                        <Text fz={"xl"} fw={"bolder"}>Žádná shoda</Text>
                    </Group>
                )
        }
    }

    let icon = (valid: boolean) => {
        if (valid)
            return (
                <ThemeIcon variant="filled" radius="xl" size="lg" color="green">
                    <IconCheck size={20}/>
                </ThemeIcon>
            );
        else
            return (
                <ThemeIcon variant="filled" radius="xl" size="lg" color="red">
                    <IconX size={20}/>
                </ThemeIcon>
            );
    };

    return (
        <Grid>
            <Grid.Col span={4}>
                <Paper shadow="xs" p="xl">
                    <Title order={2} mb={"md"}>Shoda s referenčním zadáním</Title>
                    <Stack spacing={"sm"}>
                        <Alert title={"Upozornění"} color={"yellow"} icon={<IconAlertTriangle size={16}/>}>
                            Jedná se o automatickou kontrolu, která není 100%. Každý test podléhá manuální kontrole a i
                            negativní výsledek této kontroly může vyústit v dobré manuální hodnocení.
                        </Alert>
                        <Title order={3}>Výsledek</Title>
                        {overallResult()}
                        <Divider my={"md"}/>
                        <Group className={classes.box} px={20} py={5}>
                            {icon(validatorReport.referenceMatchingResult.isomorphismCheckResult)}
                            <Box>
                                <Text weight={"bolder"}>Isomorfismus</Text>
                            </Box>
                        </Group>
                        <Flex align={"center"} className={classes.box} px={20} py={5}>
                            {icon(validatorReport.referenceMatchingResult.participantsCheckResult)}
                            <Flex ml={"md"} direction={"column"}>
                                <Text weight={"bolder"}>Kontrola participantů</Text>
                                <Text >{validatorReport.referenceMatchingResult.participantsCheckMessage}</Text>
                            </Flex>
                        </Flex>
                    </Stack>
                </Paper>
            </Grid.Col>
            <Grid.Col span={8}>
                <Paper shadow="xs" p="xl">
                    <Title order={2} mb={"md"}>Výsledky validátoru</Title>
                    <Stack spacing={"sm"}>
                        {cards}
                    </Stack>
                </Paper>
            </Grid.Col>
        </Grid>
    )

}

export default ValidatorResults