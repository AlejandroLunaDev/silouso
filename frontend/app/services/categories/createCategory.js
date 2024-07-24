const BASE_URL = 'http://localhost:8080';

export const createCategory = async name => {
    const response = await fetch(`${BASE_URL}/api/categories`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ name }),
    });
    const data = await response.json();
    return data
}