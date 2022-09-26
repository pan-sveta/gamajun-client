import {getSession} from "next-auth/react";
import {GetServerSidePropsContext} from "next/types";
import {
    Admin,
    AdminFromJSON,
    Assignment,
    AssignmentFromJSON,
    Exam,
    ExamFromJSON,
    ExamSubmission,
    ExamSubmissionCheckpointCommand,
    ExamSubmissionFromJSON,
    ExamSubmissionSubmitCommand,
    StudentExamSubmissionDTO,
    StudentExamSubmissionDTOFromJSON
} from "../types/gamajun.ts";
import {GamajunApiError} from "./GamajunApiError";
import {unstable_getServerSession} from "next-auth";
import {authOptions} from '../pages/api/auth/[...nextauth]'
import {checkIfOk, jsonArrayIfOk, jsonIfOk} from "./GamajunAPICommon";

export const getGamajunAccessToken = async (context?: GetServerSidePropsContext): Promise<string> => {
    const session = await getSession();

    if (!session?.accessToken)
        throw "Cannot get access token from session"
    else
        return String(session.accessToken);
}

const gamajunHeaders = async (context?: GetServerSidePropsContext): Promise<Record<string, string>> => {
    return {
        "Authorization": `Bearer ${await getGamajunAccessToken()}`,
        "Content-Type": "application/json"
    }
}

// HTTP Methods

const del = async (endpoint: string): Promise<Response> => {
    return fetch(`https://gamajun-api.stepanek.app${endpoint}`, {
        method: "DELETE",
        headers: await gamajunHeaders(),
    })
}

const post = async (endpoint: string, body: any): Promise<Response> => {
    return fetch(`https://gamajun-api.stepanek.app${endpoint}`, {
        method: "POST",
        headers: await gamajunHeaders(),
        body: JSON.stringify(body)
    })
}

const put = async (endpoint: string, body: any): Promise<Response> => {
    return fetch(`https://gamajun-api.stepanek.app${endpoint}`, {
        method: "PUT",
        headers: await gamajunHeaders(),
        body: JSON.stringify(body)
    })
}

//Calls
//Assignments

export const createAssignment = async (assignment: Assignment): Promise<Assignment> => {
    return post("/assignments", assignment)
        .then(res => jsonIfOk(res))
        .then(json => AssignmentFromJSON(json));
}

export const updateAssignment = async (assignment: Assignment): Promise<Assignment> => {
    return put(`/assignments/${assignment.id}`, assignment)
        .then(res => jsonIfOk(res))
        .then(json => AssignmentFromJSON(json));
}

export const deleteAssignment = async (assignmentId: string): Promise<void> => {
    return del(`/assignments/${assignmentId}`)
        .then(res => checkIfOk(res))
}

//Exams

export const createExam = async (exam: Exam): Promise<Exam> => {
    return post("/exams", exam)
        .then(res => jsonIfOk(res))
        .then(json => ExamFromJSON(json));
}

export const updateExam = async (exam: Exam): Promise<Exam> => {
    return put(`/exams/${exam.id}`, exam)
        .then(res => jsonIfOk(res))
        .then(json => ExamFromJSON(json));
}

export const deleteExam = async (examId: string): Promise<void> => {
    return del(`/exams/${examId}`)
        .then(res => checkIfOk(res))
}

export const createExamSubmission = async (examId: string): Promise<ExamSubmission> => {
    return post(`/exams/${examId}/submission`, {})
        .then(res => jsonIfOk(res))
        .then(json => ExamSubmissionFromJSON(json))
}


//Admin

export const createAdmin = async (admin: Admin): Promise<Admin> => {
    return put("/admins", admin)
        .then(res => jsonIfOk(res))
        .then(json => AdminFromJSON(json));
}

export const updateAdmin = async (admin: Admin): Promise<Admin> => {
    return put(`/admins/${admin.username}`, admin)
        .then(res => jsonIfOk(res))
        .then(json => AdminFromJSON(json));
}

export const deleteAdmin = async (adminId: string): Promise<void> => {
    return del(`/admins/${adminId}`)
        .then(res => checkIfOk(res))
}


//Submissions

export const submitSubmission = async (submissionId: string, examSubmission: ExamSubmissionSubmitCommand): Promise<StudentExamSubmissionDTO> => {
    return put(`/submissions/${submissionId}/submit`, examSubmission)
        .then(res => jsonIfOk(res))
        .then(json => StudentExamSubmissionDTOFromJSON(json));
}

export const checkpointSubmission = async (submissionId: string, examSubmission: ExamSubmissionCheckpointCommand): Promise<StudentExamSubmissionDTO> => {
    return put(`/submissions/${submissionId}/checkpoint`, examSubmission)
        .then(res => jsonIfOk(res))
        .then(json => StudentExamSubmissionDTOFromJSON(json));
}