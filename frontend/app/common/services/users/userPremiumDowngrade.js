import { getBaseUrl } from "../../helper/envHelper";

const BASE_URL = getBaseUrl();

export const userPremiumDowngrade = async (uid) => {
    try {
        const response = await fetch(`${BASE_URL}/api/users/premium/${uid}`, {
            method: 'PUT', // Cambia a PUT en lugar de POST
            headers: { 'Content-type': 'application/json' },
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Failed to downgrade user');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}
