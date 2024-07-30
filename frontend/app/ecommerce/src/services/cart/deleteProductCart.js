const BASE_URL = "http://localhost:8080";

export async function deleteProductCart(cartId, productId) {
    try {
        const response = await fetch(`${BASE_URL}/api/carts/${cartId}/products/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        throw error;
    }
}