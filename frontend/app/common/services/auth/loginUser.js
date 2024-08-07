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
    if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Número de intentos máximos alcanzados. Vuelve a intentarlo en 15 minutos.');
        } else if (response.status === 500) {
          throw new Error('Error del servidor. Inténtalo de nuevo más tarde.');
        } else {
          throw new Error('Usuario o contraseña incorrectos');
        }
      }
    const data = await response.json();


    if (data.payload.user.user.role === 'admin') {
        window.location.href = '/admin';
    }else{
        
        window.location.href = '/';
    }

    return data;
}