// services/user/uploadAddress.js

import { getBaseUrl } from "../../../../common/helper/envHelper";

const BASE_URL = getBaseUrl();

export async function uploadAddress(uid, addressData) {
    try {
        const formData = new FormData();
        Object.keys(addressData).forEach(key => {
            formData.append(key, addressData[key]);
        });

        const response = await fetch(`${BASE_URL}/api/users/${uid}/documents/address`, {
            method: 'POST',
            body: formData,
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Error uploading address documents');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error uploading address documents:', error);
        throw error;
    }
}
