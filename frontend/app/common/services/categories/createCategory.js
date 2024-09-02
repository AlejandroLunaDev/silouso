import { getBaseUrl } from "../../helper/envHelper";

const BASE_URL = getBaseUrl();

export const createCategory = async (name, isAvailable=false) => {
    const response = await fetch(`${BASE_URL}/api/categories`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ name, isAvailable }),
    });
    const data = await response.json();
    return data
}