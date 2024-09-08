import { getBaseUrl } from "../../helper/envHelper";

const BASE_URL = getBaseUrl();
export const updateUserRole = async (userId, newRole) => {
  try {
    const response = await fetch(`${BASE_URL}/api/users/${userId}/role`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ role: newRole }),
    });

    if (!response.ok) {
      const errorData = await response.json(); // Obtén datos de error si están disponibles
      throw new Error(`Failed to update user role: ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
