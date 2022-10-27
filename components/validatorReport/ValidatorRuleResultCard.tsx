import {Box, createStyles, Group, Text, ThemeIcon} from "@mantine/core";
import {IconCheck, IconX} from "@tabler/icons";
import {ValidatorRuleResult} from "../../client/generated/generated-types";

const useStyles = createStyles((theme) => ({
    box: {
        border: 1,
        borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[4],
        borderStyle: "solid",
        borderRadius: "5px",
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    }
}))

interface ValidatorRuleResultCardProps {
    validatorRuleResult: ValidatorRuleResult
}

const ValidatorRuleResultCard = ({validatorRuleResult}: ValidatorRuleResultCardProps) => {
    const {classes} = useStyles();

    if (validatorRuleResult.valid)
        return (
            <Group className={classes.box} px={20} py={5}>
                <ThemeIcon variant="filled" radius="xl" size="lg" color="green">
                    <IconCheck size={20}/>
                </ThemeIcon>
                <Box>
                    <Text weight={"bolder"}>{validatorRuleResult.validatorRule.name}</Text>
                    <Text>{validatorRuleResult.validatorRule.description}</Text>
                </Box>
            </Group>
        )
    else
        return (
            <Group className={classes.box} px={20} py={5}>
                <ThemeIcon variant="filled" radius="xl" size="lg" color="red">
                    <IconX size={20}/>
                </ThemeIcon>
                <Box>
                    <Text weight={"bolder"}>{validatorRuleResult.validatorRule.name}</Text>
                    <Text>{validatorRuleResult.message}</Text>
                </Box>
            </Group>
        )
}

export default ValidatorRuleResultCard