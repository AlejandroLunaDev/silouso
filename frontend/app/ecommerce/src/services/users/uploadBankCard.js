// services/user/uploadBankCard.js

import { getBaseUrl } from "../../../../common/helper/envHelper";

const BASE_URL = getBaseUrl();

export async function uploadBankCard(uid, bankCardFile) {
    try {
        const formData = new FormData();
        formData.append('bankCard', bankCardFile);

        const response = await fetch(`${BASE_URL}/api/users/${uid}/documents/bankcard`, {
            method: 'POST',
            body: formData,
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Error uploading bank card document');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error uploading bank card document:', error);
        throw error;
    }
}
