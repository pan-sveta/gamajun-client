export const isUserAdmin = async (username: string, token: string): Promise<boolean> => {
    return await fetch(`https://gamajun-api.stepanek.app//admins/${username}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
        .then(res => {
            if (!res.ok)
                if (res.status === 404)
                    return false
                else
                    throw new Error("Response not OK");
            else
                return true
        });
}