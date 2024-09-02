import { getBaseUrl } from "../../../../common/helper/envHelper";
const BASE_URL = getBaseUrl();

export async function createMessage(message) {
    try {
        const response = await fetch(`${BASE_URL}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(message),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating message:', error);
    }
}