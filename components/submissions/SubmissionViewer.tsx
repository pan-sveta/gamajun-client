import {Tabs} from '@mantine/core';
import {SandboxSubmissionsByIdQuery, SubmissionByIdQuery} from "../../client/generated/generated-types";
import {IconPhoto, IconSettings} from "@tabler/icons";
import SubmissionDisplay from "./SubmissionDisplay";
import ValidatorResults from "../validatorReport/ValidatorResults";

interface SubmissionViewerProps {
    submission: SubmissionByIdQuery['examSubmissionById'] | SandboxSubmissionsByIdQuery['sandboxSubmissionById']
}

const SubmissionViewer = ({submission}: SubmissionViewerProps) => {
    return (
        <Tabs defaultValue={"submission"}>
            <Tabs.List>
                <Tabs.Tab value="submission" icon={<IconPhoto size={14}/>}>Odevzdání</Tabs.Tab>
                <Tabs.Tab value="results" icon={<IconSettings size={14}/>}>Výsledky</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="submission" pt="xs">
                <SubmissionDisplay submission={submission}/>
            </Tabs.Panel>

            <Tabs.Panel value="results" pt="xs">
                <ValidatorResults submissionId={submission?.id ?? "N/A"}/>
            </Tabs.Panel>
        </Tabs>
    );
}

export default SubmissionViewer