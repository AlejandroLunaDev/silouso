const BASE_URL = 'http://localhost:8080';
export const getAdminUsers = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/users/admin`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json' },
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Failed to fetch admin users');
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};