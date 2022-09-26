import {GamajunApiError} from "../api/GamajunApiError";
import {AdminFromJSON} from "../types/gamajun.ts";

export const isUserAdmin = async (username: string, token: string): Promise<boolean> => {
    try {
        let admin = await fetch(`https://gamajun-api.stepanek.app/admins/${username}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                if (!res.ok)
                    throw new Error("Response not OK");
                else
                    return res.json()
            })
            .then(json => AdminFromJSON(json));
        return true;
    } catch (err) {
        if (err instanceof GamajunApiError) {
            if (err.httpCode === 404)
                return false;
            else
                throw err;
        }
        else {
            throw err;
        }
    }

}