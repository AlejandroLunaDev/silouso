import { getBaseUrl } from "../../helper/envHelper";

const BASE_URL = getBaseUrl();

export const createProduct = async (newProduct) => {
  try {
    const response = await fetch(`${BASE_URL}/api/products`, {
      method: 'POST',
      body: newProduct, // Enviar FormData directamente
      credentials: 'include'
    });

    if (!response.ok) {
      // Lee el mensaje de error del cuerpo de la respuesta si está disponible
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al crear el producto');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al crear el producto:', error.message);
    throw error;
  }
};
