import { getBaseUrl } from "../../helper/envHelper";

const BASE_URL = getBaseUrl();

export const updateProduct = async (productId, formData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/products/${productId}`, {
      method: 'PUT',
      body: formData,
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
