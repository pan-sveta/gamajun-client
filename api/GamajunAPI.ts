import {getSession} from "next-auth/react";
import {GetServerSidePropsContext} from "next/types";
import {Admin, AdminFromJSON, Assignment, AssignmentFromJSON, Exam, ExamFromJSON} from "../types/gamajun.ts";
import {GamajunApiError} from "./GamajunApiError";

export const getGamajunAccessToken = async (context: GetServerSidePropsContext): Promise<string> => {
    const session = await getSession(context);

    if (!session?.accessToken)
        throw "Cannot get access token from session"
    else
        return String(session.accessToken);
}

const gamajunHeaders = async (token: string): Promise<Record<string, string>> => {
    return {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    }
}

// HTTP Methods

const get = async (endpoint: string, token: string): Promise<Response> => {
    return fetch(`https://gamajun-api.stepanek.app${endpoint}`, {
        method: "GET",
        headers: await gamajunHeaders(token),
    })
}

const del = async (endpoint: string, token: string): Promise<Response> => {
    return fetch(`https://gamajun-api.stepanek.app${endpoint}`, {
        method: "DELETE",
        headers: await gamajunHeaders(token),
    })
}

const post = async (endpoint: string, body: any, token: string): Promise<Response> => {
    return fetch(`https://gamajun-api.stepanek.app${endpoint}`, {
        method: "POST",
        headers: await gamajunHeaders(token),
        body: body
    })
}

const put = async (endpoint: string, body: any, token: string): Promise<Response> => {
    return fetch(`https://gamajun-api.stepanek.app${endpoint}`, {
        method: "PUT",
        headers: await gamajunHeaders(token),
        body: body
    })
}

//Helpers
const jsonIfOk = (res: Response): Promise<JSON> => {
    if (!res.ok)
        throw new GamajunApiError(res.url, res.status);
    else
        return res.json()
}

const jsonArrayIfOk = (res: Response): Promise<Array<JSON>> => {
    if (!res.ok)
        throw new GamajunApiError(res.url, res.status);
    else
        return res.json()
}

const checkIfOk = (res: Response): void => {
    if (!res.ok)
        throw new GamajunApiError(res.url, res.status);
}

//Calls
//Assignments

export const createAssignment = async (assignment: Assignment, token: string): Promise<Assignment> => {
    return post("/assignments", token, JSON.stringify(assignment))
        .then(res => jsonIfOk(res))
        .then(json => AssignmentFromJSON(json));
}

export const getAssignment = async (id: string, token: string): Promise<Assignment> => {
    return get(`/assignments/${id}`, token)
        .then(res => jsonIfOk(res))
        .then(json => AssignmentFromJSON(json));
}

export const getAllAssignments = async (token: string): Promise<Array<Assignment>> => {
    return get("/assignments", token)
        .then(res => jsonArrayIfOk(res))
        .then(arr => arr.map((ass) => AssignmentFromJSON(ass)));
}

export const updateAssignment = async (assignment: Assignment, token: string): Promise<Assignment> => {
    return put(`/assignments/${assignment.id}`, JSON.stringify(assignment), token)
        .then(res => jsonIfOk(res))
        .then(json => AssignmentFromJSON(json));
}

export const deleteAssignment = async (assignmentId: string, token: string): Promise<void> => {
    return del(`/assignments/${assignmentId}`, token)
        .then(res => checkIfOk(res))
}

//Exams

export const createExam = async (exam: Exam, token: string): Promise<Exam> => {
    return put("/exams", JSON.stringify(exam), token)
        .then(res => jsonIfOk(res))
        .then(json => ExamFromJSON(json));
}

export const getAllExams = async (token: string): Promise<Array<any>> => {
    return get("/exams", token)
        .then(res => jsonArrayIfOk(res))
    //.then(arr => arr.map((ass) => ExamFromJSON(ass)));
}

export const getExam = async (id: string, token: string): Promise<any> => {
    return get(`/exams/${id}`, token)
        .then(res => jsonIfOk(res))
    //.then(json => ExamFromJSON(json));
}

export const updateExam = async (exam: Exam, token: string): Promise<Exam> => {
    return put(`/exams/${exam.id}`, JSON.stringify(exam), token)
        .then(res => jsonIfOk(res))
        .then(json => ExamFromJSON(json));
}

export const deleteExam = async (examId: string, token: string): Promise<void> => {
    return del(`/exams/${examId}`, token)
        .then(res => checkIfOk(res))
}

//Admin

export const createAdmin = async (admin: Admin, token: string): Promise<Admin> => {
    return put("/admins", JSON.stringify(admin), token)
        .then(res => jsonIfOk(res))
        .then(json => AdminFromJSON(json));
}

export const getAllAdmins = async (token: string): Promise<Array<Admin>> => {
    return get("/admins", token)
        .then(res => jsonArrayIfOk(res))
        .then(arr => arr.map((ass) => AdminFromJSON(ass)));
}

export const getAdmin = async (username: string, token: string): Promise<Admin> => {
    return get(`/admins/${username}`, token)
        .then(res => jsonIfOk(res))
        .then(json => AdminFromJSON(json));
}

export const updateAdmin = async (admin: Admin, token: string): Promise<Admin> => {
    return put(`/admins/${admin.username}`, JSON.stringify(admin), token)
        .then(res => jsonIfOk(res))
        .then(json => AdminFromJSON(json));
}

export const deleteAdmin = async (adminId: string, token: string): Promise<void> => {
    return del(`/admins/${adminId}`, token)
        .then(res => checkIfOk(res))
}