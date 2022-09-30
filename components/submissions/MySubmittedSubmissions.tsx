import {useMySubmissionsQuery} from "../../client/generated/generated-types";
import {Stack} from "@mantine/core";
import SubmissionCard from "./SubmissionCard";
import GamajunLoader from "../common/GamajunLoader";

const MySubmissions = () => {
    const {data, loading, error} = useMySubmissionsQuery();

    function draftSubmissionCards() {
        if (!data?.myExamSubmissions)
            return <GamajunLoader/>

        return data.myExamSubmissions
            .filter(ass => ass?.examSubmissionState === "Submitted")
            .map(ass => <SubmissionCard key={ass?.id} examSubmission={ass}/>);
    }

    return (
        <div>
            <h2>Moje odevzdané zkoušky</h2>
            <Stack>
                {loading ? <GamajunLoader/> : draftSubmissionCards()}
            </Stack>
        </div>
    )
}

export default MySubmissions