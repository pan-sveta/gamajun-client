import {useMySubmissionsQuery} from "../../client/generated/generated-types";
import {Center, Skeleton, Stack, Text} from "@mantine/core";
import SubmissionCard from "./SubmissionCard";
import React from "react";

const MySubmissions = () => {
    const {data, loading, error} = useMySubmissionsQuery();

    function draftSubmissionCards() {
        if (!data?.myExamSubmissions)
            return <div>duck</div>;
        else if (data.myExamSubmissions.length < 1)
            return (
                <Center mih={"10vh"}>
                    <Text color={"gray"}>Žádné zkoušky</Text>
                </Center>
            );
        else
            return data.myExamSubmissions
                .filter(ass => ass?.examSubmissionState != "Draft")
                .map(ass => <SubmissionCard key={ass?.id} examSubmission={ass}/>);
    }

    return (
        <div>
            <h2>Moje odevzdané zkoušky</h2>
            <Stack>
                {loading ? <Skeleton height={"10vh"}/> : draftSubmissionCards()}
            </Stack>
        </div>
    )
}

export default MySubmissions