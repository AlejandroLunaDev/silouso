import { getBaseUrl } from "../../helper/envHelper";

const BASE_URL = getBaseUrl();

export const getProducts = async (page = 1, limit = 10, sortOrder = 'desc', sortBy = 'created_at', category = null) => {
    try {
        let url = `${BASE_URL}/api/products/paginate?page=${page}&limit=${limit}&sort=${sortOrder}&sortBy=${sortBy}`;
        
        if (category) {
            url += `&category=${encodeURIComponent(category)}`;
        }
        
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-type': 'application/json' },
            credentials: 'include',
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};
