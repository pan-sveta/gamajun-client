import {useMySubmissionsQuery} from "../../client/generated/generated-types";
import {Center, Skeleton, Stack, Text} from "@mantine/core";
import SubmissionCard from "./SubmissionCard";
import GamajunLoader from "../common/GamajunLoader";
import React from "react";

const MyDraftSubmissions = () => {
    const {data, loading, error} = useMySubmissionsQuery();

    function draftSubmissionCards() {
        if (!data?.myExamSubmissions)
            return null;

        let filtered = data.myExamSubmissions.filter(ass => ass?.examSubmissionState === "Draft");

        if (filtered.length < 1)
            return (
                <Center mih={"10vh"}>
                    <Text color={"gray"}>Žádné zkoušky</Text>
                </Center>
            );

        return filtered.map(ass => <SubmissionCard key={ass?.id} examSubmission={ass}/>);
    }

    return (
        <div>
            <h2>Moje rozdělané zkoušky</h2>
            <Stack>
                {loading ? <Skeleton height={"10vh"}/> : draftSubmissionCards()}
            </Stack>
        </div>
    )
}

export default MyDraftSubmissions