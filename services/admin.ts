import {getAdmin} from "../api/GamajunAPI";
import {GamajunApiError} from "../api/GamajunApiError";

export const isUserAdmin = async (username: string, token: string): Promise<boolean> => {
    try {
        let admin = await getAdmin(username, token);
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