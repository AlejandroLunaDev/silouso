import { getBaseUrl } from "../../../../common/helper/envHelper";
const BASE_URL = getBaseUrl();

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
