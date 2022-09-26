import ExamCard from "../../components/exams/ExamCard";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {Exam, ExamFromJSON, StudentExamSubmissionDTO, StudentExamSubmissionDTOFromJSON} from "../../types/gamajun.ts";
import SubmissionCard from "../../components/submissions/SubmissionCard";
import {Stack} from "@mantine/core";
import {getMySubmissions, getOpenedExams} from "../../api/GamajunAPIServer";

const MyExams = ({openedExams, mySubmissions}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    //Fix protože next neumí ze SSR poslat date type, tak to posílám jako JSON a tipuji až tady
    let openedExamsConverted: Array<Exam> = openedExams.map((exam: any) => ExamFromJSON(exam));
    let mySubmissionsConverted: Array<StudentExamSubmissionDTO> = mySubmissions.map((submission: any) => StudentExamSubmissionDTOFromJSON(submission));

    let openedExamsCards = openedExamsConverted.map(exam => <ExamCard key={exam.id} exam={exam}/>)
    let draftSubmissionCards = mySubmissionsConverted
        .filter(sub => sub.examSubmissionState === "Draft")
        .map(submission => <SubmissionCard key={submission.id} examSubmission={submission}/>)
    let completedSubmissionCards = mySubmissionsConverted
        .filter(sub => sub.examSubmissionState !== "Draft")
        .map(submission => <SubmissionCard key={submission.id} examSubmission={submission}/>)

    return (
        <div>
            <h2>Dostupné zkoušky</h2>
            <Stack>
                {openedExamsCards}
            </Stack>
            <h2>Moje rozdělané zkoušky</h2>
            <Stack>
                {draftSubmissionCards}
            </Stack>
            <h2>Moje hotové zkoušky</h2>
            <Stack>
                {completedSubmissionCards}
            </Stack>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const openedExams = await getOpenedExams(context);
    const mySubmissions = await getMySubmissions(context);


    return {
        props: {
            openedExams: openedExams,
            mySubmissions: mySubmissions
        }, // will be passed to the page component as props
    }
}

export default MyExams