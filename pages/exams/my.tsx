import ExamCard from "../../components/exams/ExamCard";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {getGamajunAccessToken, getMySubmissions, getOpenedExams} from "../../api/GamajunAPI";
import {
    Exam,
    ExamFromJSON,
    ExamSubmissionFromJSON,
    StudentExamDTO, StudentExamSubmissionDTO,
    StudentExamSubmissionDTOFromJSON
} from "../../types/gamajun.ts";
import SubmissionCard from "../../components/submissions/SubmissionCard";
import {Stack} from "@mantine/core";

const MyExams = ({openedExams, mySubmissions}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    //Fix protože next neumí ze SSR poslat date type, tak to posílám jako JSON a typuju až tady

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
    const token = await getGamajunAccessToken(context);

    const openedExams = await getOpenedExams(token);
    const mySubmissions = await getMySubmissions(token);

    return {
        props: {
            openedExams: openedExams,
            mySubmissions: mySubmissions
        }, // will be passed to the page component as props
    }
}

export default MyExams