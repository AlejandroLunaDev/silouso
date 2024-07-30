const BASE_URL = "http://localhost:8080"; // Asegúrate de incluir 'http://'

export async function getCartById(id) {
    try {
        const response = await fetch(`${BASE_URL}/api/carts/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        throw error; // Lanza el error para manejarlo más arriba
    }
}
