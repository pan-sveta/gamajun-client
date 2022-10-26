import {NextPage} from "next";
import Link from "next/link";
import {Button, Group, Stack, Title} from "@mantine/core";
import {IconPlus} from "@tabler/icons";
import ExamsTable from "../../components/exams/ExamsTable";
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