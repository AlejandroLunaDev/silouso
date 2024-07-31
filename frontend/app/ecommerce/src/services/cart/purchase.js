const BASE_URL = 'http://localhost:8080';

export const purchase = async (cartId, userEmail) => {
    const response = await fetch(`${BASE_URL}/api/carts/${cartId}/purchase`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({email:userEmail}),
    });
    const data = await response.json();
    return data;
}