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
    if (!context)
        throw "Cannot get access token from session"

    const session = await unstable_getServerSession(context.req, context.res, authOptions)

    if (!session?.accessToken)
        throw "Cannot get access token from session"
    else
        return String(session.accessToken);
}

const gamajunHeaders = async (context?: GetServerSidePropsContext): Promise<Record<string, string>> => {
    return {
        "Authorization": `Bearer ${await getGamajunAccessToken(context)}`,
        "Content-Type": "application/json"
    }
}

// HTTP Methods

const get = async (endpoint: string, context?: GetServerSidePropsContext): Promise<Response> => {
    return fetch(`https://gamajun-api.stepanek.app${endpoint}`, {
        method: "GET",
        headers: await gamajunHeaders(context),
    })
}

//Calls
//Assignments

export const getAssignment = async (id: string, context?: GetServerSidePropsContext): Promise<Assignment> => {
    return get(`/assignments/${id}`, context)
        .then(res => jsonIfOk(res))
        .then(json => AssignmentFromJSON(json));
}

export const getAllAssignments = async (context?: GetServerSidePropsContext): Promise<Array<Assignment>> => {
    return get("/assignments", context)
        .then(res => jsonArrayIfOk(res))
        .then(arr => arr.map((ass) => AssignmentFromJSON(ass)));
}

//Exams

export const getAllExams = async (context?: GetServerSidePropsContext): Promise<Array<any>> => {
    return get("/exams", context)
        .then(res => jsonArrayIfOk(res))
    //.then(arr => arr.map((ass) => ExamFromJSON(ass)));
}

export const getExam = async (id: string, context?: GetServerSidePropsContext): Promise<any> => {
    return get(`/exams/${id}`, context)
        .then(res => jsonIfOk(res))
    //.then(json => ExamFromJSON(json));
}

export const getOpenedExams = async (context?: GetServerSidePropsContext): Promise<Array<any>> => {
    return get(`/exams/opened`, context)
        .then(res => jsonArrayIfOk(res))
}

//Admin

export const getAllAdmins = async (context?: GetServerSidePropsContext): Promise<Array<Admin>> => {
    return get("/admins", context)
        .then(res => jsonArrayIfOk(res))
        .then(arr => arr.map((ass) => AdminFromJSON(ass)));
}

export const getAdmin = async (username: string, context?: GetServerSidePropsContext): Promise<Admin> => {
    return get(`/admins/${username}`, context)
        .then(res => jsonIfOk(res))
        .then(json => AdminFromJSON(json));
}

//Submissions

export const getSubmission = async (submissionId: string, context?: GetServerSidePropsContext): Promise<any> => {
    return get(`/submissions/${submissionId}`, context)
        .then(res => jsonArrayIfOk(res))
    //.then(json => StudentExamSubmissionDTOFromJSON(json));
}

export const getMySubmissions = async (context?: GetServerSidePropsContext): Promise<Array<any>> => {
    return get("/submissions/my", context)
        .then(res => jsonArrayIfOk(res))
    //.then(arr => arr.map((ass) => StudentExamSubmissionDTOFromJSON(ass)));
}