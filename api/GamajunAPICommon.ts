//Helpers
import {GamajunApiError} from "./GamajunApiError";

export const jsonIfOk = (res: Response): Promise<JSON> => {
    if (!res.ok)
        throw new GamajunApiError(res.url, res.status);
    else
        return res.json()
}

export const jsonArrayIfOk = (res: Response): Promise<Array<JSON>> => {
    if (!res.ok)
        throw new GamajunApiError(res.url, res.status);
    else
        return res.json()
}

export const checkIfOk = (res: Response): void => {
    if (!res.ok)
        throw new GamajunApiError(res.url, res.status);
}