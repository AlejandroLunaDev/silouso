import { getBaseUrl } from "../../../../common/helper/envHelper";
const BASE_URL = getBaseUrl();

export async function addToCart(cartId, productId) {
    try {
        const response = await fetch(`${BASE_URL}/api/carts/${cartId}/products/${productId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            // El ID del producto se pasa como parte de la URL, no en el cuerpo
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al agregar el producto:', error);
        throw error;
    }
}
