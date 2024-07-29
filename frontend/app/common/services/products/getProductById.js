const BASE_URL = 'http://localhost:8080'; // Reemplaza con la URL base de tu backend
export const getProductById = async (productId) => {
    try {
      const response = await fetch(`${BASE_URL}/api/products/${productId}`);
      if (!response.ok) {
        throw new Error('Error al obtener el producto por ID');
      }
      const data = await response.json();
    
      return data;
    } catch (error) {
      console.error('Error al obtener el producto por ID:', error);
      throw error;
    }
  };