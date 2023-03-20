import {Box, Collapse, createStyles, Divider, Flex, Group, Loader, Text, ThemeIcon} from "@mantine/core";
import {IconCheck, IconChevronDown, IconX} from "@tabler/icons-react";
import {ValidatorRuleResult} from "../../client/generated/generated-types";
import {useState} from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

const BpmnViewer = dynamic(() => {
    // @ts-ignore
    return import("../../components/bpmn/modeler/BpmnViewer");
}, {
    loading: () => <Loader variant="bars"/>,
    ssr: false
});

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

    const [opened, setOpened] = useState(false);

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

    let validExample = () => {
        return `/rulesExamples/${validatorRuleResult.validatorRule.id}Valid.svg`
    }

    let invalidExample = () => {
        return `/rulesExamples/${validatorRuleResult.validatorRule.id}Invalid.svg`
    }

    return (
        <Flex direction={"column"} className={classes.box} px={20} py={5} onClick={() => setOpened(!opened)} style={{"cursor":"pointer"}}>
            <Flex justify={"space-between"} align={"center"}>
                <Group>
                    {icon(validatorRuleResult.valid)}
                    <Box>
                        <Text weight={"bolder"}>{validatorRuleResult.validatorRule.name}</Text>
                    </Box>
                </Group>
                <IconChevronDown/>
            </Flex>
            <Collapse in={opened}>
                <Flex direction={"column"} py={"md"}>
                    <Text>{validatorRuleResult.validatorRule.description}</Text>
                    <Divider my="sm" />
                    <Image src={invalidExample()} alt={"Invalid example"} width={"250"} height={"175"}/>
                    <Text ta={"center"} fw={"bold"} fz={"sm"} color={"red"}>Špatně</Text>
                    <Divider my="sm" />
                    <Image src={validExample()} alt={"Valid example"} width={"250"} height={"175"}/>
                    <Text ta={"center"} fw={"bold"} fz={"sm"} color={"green"}>Správně</Text>
                </Flex>
            </Collapse>
        </Flex>
    )

}

export default ValidatorRuleResultCard