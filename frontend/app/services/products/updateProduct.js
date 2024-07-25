const BASE_URL = 'http://localhost:8080';

export const updateProduct = async (productId, productData, files) => {
  try {
    const formData = new FormData();
    
    // Agregar los campos de producto al FormData
    formData.append('title', productData.title);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    formData.append('stock', productData.stock);
    formData.append('category', productData.category);

    // Agregar las imágenes al FormData
    if (files && files.length > 0) {
      files.forEach(file => {
        formData.append('identification', file);
      });
    }

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
