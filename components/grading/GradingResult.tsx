import React from 'react';
import {Box, Center, createStyles, Flex, Paper, Text, Title} from "@mantine/core";
import {ExamSubmissionState, SubmissionByIdQuery} from "../../client/generated/generated-types";

const useStyles = createStyles((theme) => ({
    numberCircle: {
        width: "50px",
        lineHeight: "48px",
        borderRadius: "100%",
        textAlign: "center",
        fontSize: "16px",
        border: "2px solid #1e4d80",
        backgroundColor: "#1e4d80",
        color: "white",
        fontWeight: "bold",
    },
}));

interface GradingResultProps {
    submission: SubmissionByIdQuery['examSubmissionById']
}

const GradingResult = ({submission}: GradingResultProps) => {
    const {classes} = useStyles();

    if (submission?.examSubmissionState != ExamSubmissionState.Graded)
        return null;

    return (
        <Paper shadow="xs" p="xl" mb={"md"} withBorder>
            <Title order={3} mb={"sm"}>Hodnocení</Title>
            <Flex align={"center"} justify={"left"}>
                <Center>
                    <Flex align={"center"}>
                        <div className={classes.numberCircle}>{submission?.points}</div>
                        <Text fw={"bold"} ml={"sm"}>bodů</Text>
                    </Flex>
                </Center>
                <Box mx={"xl"}>
                    <Text fw={"bold"}>Komentář:</Text>
                    <Text>{submission?.comment}</Text>
                </Box>
            </Flex>
        </Paper>
    );
};

export default GradingResult;
