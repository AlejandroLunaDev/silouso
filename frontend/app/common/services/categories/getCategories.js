import { getBaseUrl } from "../../helper/envHelper";

const BASE_URL = getBaseUrl();

export const getCategories = async () => {
    const response = await fetch(`${BASE_URL}/api/categories`, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    const data = await response.json();
    return data
}