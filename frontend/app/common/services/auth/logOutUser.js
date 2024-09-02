import { getBaseUrl } from "../../helper/envHelper";

const BASE_URL = getBaseUrl();

export const logOutUser = async () => {
    const response = await fetch(`${BASE_URL}/api/sessions/logout`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    const data = await response.json();
    return data;
}