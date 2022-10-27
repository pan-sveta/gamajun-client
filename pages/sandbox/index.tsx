import {NextPage} from "next";
import {Stack} from "@mantine/core";
import {useSandboxAssignmentsQuery} from "../../client/generated/generated-types";
import GamajunLoader from "../../components/common/GamajunLoader";
import SandboxCard from "../../components/sandbox/SandboxCard";

const Exams: NextPage = () => {
    const {data, loading, error} = useSandboxAssignmentsQuery();

    if (loading)
        return <GamajunLoader></GamajunLoader>;

    const cards = data?.sandboxAssignments.map(ass => <SandboxCard key={ass.id} assignment={ass}/>)

    return (
        <Stack>
            {cards}
        </Stack>
    );
}
export default Exams