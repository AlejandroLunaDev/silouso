const BASE_URL = 'http://localhost:8080';



export const deleteCategory = async id => {
    const response = await fetch(`${BASE_URL}/api/categories/${id}`, {
        method: 'DELETE', 
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    const data = await response.json();
    return data
}