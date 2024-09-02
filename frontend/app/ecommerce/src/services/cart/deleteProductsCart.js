import { getBaseUrl } from "../../../../common/helper/envHelper";
const BASE_URL = getBaseUrl();

export async function deleteProductsCart(cartId) {
    try {
        const response = await fetch(`${BASE_URL}/api/carts/${cartId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al eliminar el carrito:', error);
        throw error;
    }
}