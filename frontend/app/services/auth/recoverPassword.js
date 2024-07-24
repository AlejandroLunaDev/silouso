const BASE_URL = 'http://localhost:8080';

export const recoverPassword = async email => {
     const response = await fetch(`${BASE_URL}/api/sessions/recoverpassword`, {
          method: 'POST',
          headers: {
                'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({email}),
     });
     const data = await response.json();
    return data
}