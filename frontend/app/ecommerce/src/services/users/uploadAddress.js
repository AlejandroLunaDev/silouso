// services/user/uploadAddress.js

import { getBaseUrl } from "../../../../common/helper/envHelper";

const BASE_URL = getBaseUrl();

export async function uploadAddress(uid, addressData) {
    console.log('uploadAddress: uid:', uid, 'addressData:', addressData);
    try {
        console.log()
        const response = await fetch(`${BASE_URL}/api/users/${uid}/documents/address`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Indica que estamos enviando JSON
            },
            body: JSON.stringify(addressData), // Convierte el objeto addressData a JSON
            credentials: 'include', // Asegúrate de que la cookie está siendo enviada
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


