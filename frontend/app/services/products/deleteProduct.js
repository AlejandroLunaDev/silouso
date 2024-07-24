const BASE_URL = 'http://localhost:8080'; // Reemplaza con la URL base de tu backend
export const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`${BASE_URL}/api/products/${productId}`, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' },
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };