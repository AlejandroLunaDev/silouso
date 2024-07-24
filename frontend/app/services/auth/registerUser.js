const BASE_URL = 'http://localhost:8080';

export const registerUser = async credentials => {
    const response = await fetch(`${BASE_URL}/api/sessions/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(credentials),
    });
   return response
}