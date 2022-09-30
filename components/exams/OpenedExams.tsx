import {useOpenedExamsQuery} from "../../client/generated/generated-types";
import {Stack} from "@mantine/core";
import ExamCard from "./ExamCard";
import GamajunLoader from "../common/GamajunLoader";

const OpenedExams = () => {
    let {data, loading, error} = useOpenedExamsQuery()

    const openedExamsCards = () => {
        if (!data?.openedExams)
            return <GamajunLoader/>
        return (
            data?.openedExams.map(exam => <ExamCard key={exam.id} exam={exam}/>)
        )
    }

    return (
        <div>
            <h2>Dostupné zkoušky</h2>
            <Stack>
                {loading ? <GamajunLoader/> : openedExamsCards()}
            </Stack>
        </div>
    );
}

export default OpenedExams