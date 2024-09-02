import { getBaseUrl } from "../../helper/envHelper";

const BASE_URL = getBaseUrl();
export const deleteUser = async (userId) => {
    try {
        const response = await fetch(`${BASE_URL}/api/users/${userId}`, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' },
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Failed to delete user');
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}