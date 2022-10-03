import ExamCard from "../../components/exams/ExamCard";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {Exam, ExamFromJSON, StudentExamSubmissionDTO, StudentExamSubmissionDTOFromJSON} from "../../types/gamajun.ts";
import SubmissionCard from "../../components/submissions/SubmissionCard";
import {Stack} from "@mantine/core";
import {useOpenedExamsQuery} from "../../client/generated/generated-types";
import OpenedExams from "../../components/exams/OpenedExams";
import MyDraftSubmissions from "../../components/submissions/MyDraftSubmissions";
import MySubmissions from "../../components/submissions/MySubmittedSubmissions";

const MyExams = () => {

    return (
        <div>
            <OpenedExams/>
            <MyDraftSubmissions/>
            <MySubmissions/>
        </div>
    );
}

export default MyExams