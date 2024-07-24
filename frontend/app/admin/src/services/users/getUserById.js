const BASE_URL = 'http://localhost:8080';
export const getUserById = async (userId) => {
    try {
        const response = await fetch(`${BASE_URL}/api/users/${userId}`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json' },
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Failed to fetch user');
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}