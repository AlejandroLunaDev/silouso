import { getBaseUrl } from "../../../../common/helper/envHelper";
const BASE_URL = getBaseUrl();


export const updateQuantity = async (cartId, productId, quantity) => {
    try {
        const response = await fetch(`${BASE_URL}/api/carts/${cartId}/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ quantity }),
        });

        // Log de la respuesta para depurar
        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error updating quantity:', error);
        throw error;
    }
}
