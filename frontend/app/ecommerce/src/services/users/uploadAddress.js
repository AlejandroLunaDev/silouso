// services/user/uploadAddress.js

import { getBaseUrl } from "../../../../common/helper/envHelper";

const BASE_URL = getBaseUrl();
console.log('BASE_URL:', BASE_URL);
export async function uploadAddress(uid, addressData) {
    console.log('uploadAddress: uid:', uid, 'addressData:', addressData);
    try {
        console.log()
        const response = await fetch(`${BASE_URL}/api/users/${uid}/documents/address`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(addressData), 
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


