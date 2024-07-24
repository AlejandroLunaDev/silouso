const BASE_URL = 'http://localhost:8080'; // Reemplaza con la URL base de tu backend
export const updateProduct = async (productId, productData) => {
    try {
      const response = await fetch(`${BASE_URL}/api/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(productData),
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to update product');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };