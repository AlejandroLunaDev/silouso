const BASE_URL = 'http://localhost:8080';

export const updatePassword = async (password, password2, token) => {
    const URL = `${BASE_URL}/api/sessions/updatepassword`;
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ password, password2, token }),  
    });

    if (!response.ok) {
        throw new Error('Error en la actualización de la contraseña');
    }

    return response.json();
};
