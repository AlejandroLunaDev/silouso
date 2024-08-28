const BASE_URL = "http://localhost:8080";

export async function getMessages() {
    try {
        const response = await fetch(`${BASE_URL}/api/chat`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
}