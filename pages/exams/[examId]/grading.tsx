import SubmissionsTable from "../../../components/exams/SubmissionsTable";
import {useExamByIdQuery} from "../../../client/generated/generated-types";
import {useRouter} from "next/router";
import {Box, Group, Skeleton, Text, Title} from "@mantine/core";

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