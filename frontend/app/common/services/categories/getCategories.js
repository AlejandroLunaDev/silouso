const BASE_URL = 'http://localhost:8080';

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