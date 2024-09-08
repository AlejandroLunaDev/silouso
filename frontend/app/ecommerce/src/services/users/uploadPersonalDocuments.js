import { getBaseUrl } from "../../../../common/helper/envHelper";

const BASE_URL = getBaseUrl();

export async function uploadPersonalDocuments(uid, formValues, files) {
    try {
        const formData = new FormData();
        formData.append('dniFront', files.identificationFront); // Asegúrate de que el nombre coincida
        formData.append('dniBack', files.identificationBack); // Asegúrate de que el nombre coincida

        // Agrega los campos adicionales esperados por el backend
        formData.append('fullName', formValues.fullName);
        formData.append('dni', formValues.dni);
        formData.append('birthDate', formValues.birthDate);
        formData.append('phone', formValues.phone);

        const response = await fetch(`${BASE_URL}/api/users/${uid}/documents/personal`, {
            method: 'POST',
            body: formData,
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Error uploading personal documents');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error uploading personal documents:', error);
        throw error;
    }
}
