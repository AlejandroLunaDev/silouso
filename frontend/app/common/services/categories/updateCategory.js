import { getBaseUrl } from "../../helper/envHelper";

const BASE_URL = getBaseUrl();

export const updateCategory = async (id, name, isAvailable, parentCategory) => {
  const response = await fetch(`${BASE_URL}/api/categories/${id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ name, isAvailable, parentCategory }),
  });

  if (!response.ok) {
      throw new Error('Error updating category');
  }

  const data = await response.json();
  return data;
};
