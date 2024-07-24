const BASE_URL = 'http://localhost:8080';


export const loginGoogleUser = async () => {
    console.log("Enviando petición GET a:", `${BASE_URL}api/sessions/google`);
    window.location.href = `${BASE_URL}/api/sessions/google`;
}


export const loginGoogleUserCallback = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/sessions/google/callback`, {
            method: 'GET',  
            headers: {
                'Content-Type': 'application/json',
            },
        });         
        const data = await response.json();
        console.log(data);        
        return data;
    } catch (error) {        
        console.error(error);
        throw error;
    }
}