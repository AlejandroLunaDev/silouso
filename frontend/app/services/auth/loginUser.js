const BASE_URL = 'http://localhost:8080';

export const loginUser = async (credentials) => {
    const response = await fetch(`${BASE_URL}/api/sessions/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (data.payload.user.user.role === 'admin') {
        window.location.href = '/admin';
    }else{
        localStorage.setItem('user', JSON.stringify(data.payload.user.user));
        window.location.href = '/';
    }

    return data;
}