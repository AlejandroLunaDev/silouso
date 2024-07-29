const BASE_URL = 'http://localhost:8080';
export const createSubcategory = async (name, parentId, isAvailable=false) => {
    const response = await fetch(`${BASE_URL}/api/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ name, parentCategory: parentId, isAvailable }),
    });
    const data = await response.json();
    return data;
  };
  