import { getBaseUrl } from "../../helper/envHelper";

const BASE_URL = getBaseUrl();
export const getUsers = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/users`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json' },
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};