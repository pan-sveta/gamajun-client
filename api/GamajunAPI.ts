import {getSession} from "next-auth/react";
import {GetServerSidePropsContext} from "next/types";

export const GetGamajunAccessToken = async (context: GetServerSidePropsContext): Promise<string> => {
    const session = await getSession(context);

    if (!session?.accessToken)
        throw "Cannot get access token from session"
    else
        return String(session.accessToken);
}

const GamajunHeaders = async (token: string): Promise<Record<string, string>> => {
    return {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    }
}

export const GetAssignment = async (id:string, token: string) => {
    return fetch(`https://gamajun-api.stepanek.app/assignments/${id}`, {
        method: "GET",
        headers: await GamajunHeaders(token),
    })
        .then(res => res.json());
}

export const GetAllAssignments = async (token: string) => {
    return fetch("https://gamajun-api.stepanek.app/assignments", {
        method: "GET",
        headers: await GamajunHeaders(token),
    })
        .then(res => res.json());
}

export const CreateAssignment = async (assignment: any, token: string) => {
    fetch("https://gamajun-api.stepanek.app/assignments", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(assignment)
    }).then(res => res.json());
}


