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
        body: JSON.stringify({ role: newRole }), // Asegúrate de enviar el rol correctamente
      });
      if (!response.ok) {
        throw new Error('Failed to update user role');
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };