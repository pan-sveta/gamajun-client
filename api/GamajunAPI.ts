import {getSession} from "next-auth/react";
import {GetServerSidePropsContext} from "next/types";
import {Assignment, AssignmentFromJSON} from "../types/gamajun.ts";
import {throws} from "assert";

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

export const getAssignment = async (id: string, token: string): Promise<Assignment> => {
    return fetch(`https://gamajun-api.stepanek.app/assignments/${id}`, {
        method: "GET",
        headers: await gamajunHeaders(token),
    })
        .then(res => {
            if (!res.ok)
                throw new Error(`Request failed: HTTP code ${res.status}`);
            else
                return res.json()
        })
        .then(json => AssignmentFromJSON(json));
}

export const getAllAssignments = async (token: string): Promise<Array<Assignment>> => {
    return fetch("https://gamajun-api.stepanek.app/assignments", {
        method: "GET",
        headers: await gamajunHeaders(token),
    })
        .then(res => {
            if (!res.ok)
                throw new Error(`Request failed: HTTP code ${res.status}`);
            else
                return res.json()
        })
        .then(arr => arr.map((ass: Array<any>) => AssignmentFromJSON(ass)));
}

export const createAssignment = async (assignment: Assignment, token: string): Promise<Assignment> => {
    return fetch("https://gamajun-api.stepanek.app/assignments", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(assignment)
    })
        .then(res => {
            if (!res.ok)
                throw new Error(`Request failed: HTTP code ${res.status}`);
            else
                return res.json()
        })
        .then(json => AssignmentFromJSON(json));
}

export const updateAssignment = async (assignment: Assignment, token: string): Promise<Assignment> => {
    return fetch(`https://gamajun-api.stepanek.app/assignments/${assignment.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(assignment)
    })
        .then(res => {
            if (!res.ok)
                throw new Error(`Request failed: HTTP code ${res.status}`);
            else
                return res.json()
        })
        .then(json => AssignmentFromJSON(json));
}

export const deleteAssignment = async (assignmentId: string, token: string): Promise<void> => {
    return fetch(`https://gamajun-api.stepanek.app/assignments/${assignmentId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
        .then(res => {
            if (!res.ok) {
                throw new Error(`Request failed: HTTP code ${res.status}`);
            }
            else
                return;
        })
}


