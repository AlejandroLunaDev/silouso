import { getBaseUrl } from "../../../../common/helper/envHelper";
const BASE_URL = getBaseUrl();

export async function updateCart(cartId, product) {
    try {
        const response = await fetch(`${BASE_URL}/api/carts/${cartId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ product }), // Envía el producto en el cuerpo de la solicitud
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al actualizar el carrito:', error);
        throw error;
    }
}