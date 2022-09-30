import ExamCard from "../../components/exams/ExamCard";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {Exam, ExamFromJSON, StudentExamSubmissionDTO, StudentExamSubmissionDTOFromJSON} from "../../types/gamajun.ts";
import SubmissionCard from "../../components/submissions/SubmissionCard";
import {Stack} from "@mantine/core";
import {getMySubmissions, getOpenedExams} from "../../api/GamajunAPIServer";
import {useOpenedExamsQuery} from "../../client/generated/generated-types";
import OpenedExams from "../../components/exams/OpenedExams";
import MyDraftSubmissions from "../../components/submissions/MyDraftSubmissions";
import MySubmissions from "../../components/submissions/MySubmittedSubmissions";

const MyExams = () => {



    /*let draftSubmissionCards = mySubmissionsConverted
        .filter(sub => sub.examSubmissionState === "Draft")
        .map(submission => <SubmissionCard key={submission.id} examSubmission={submission}/>)
    let completedSubmissionCards = mySubmissionsConverted
        .filter(sub => sub.examSubmissionState !== "Draft")
        .map(submission => <SubmissionCard key={submission.id} examSubmission={submission}/>)*/



    return (
        <div>
            <OpenedExams/>
            <MyDraftSubmissions/>
            <MySubmissions/>
        </div>
    );
}

export default MyExams