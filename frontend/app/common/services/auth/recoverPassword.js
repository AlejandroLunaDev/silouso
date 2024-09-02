import { getBaseUrl } from "../../helper/envHelper";

const BASE_URL = getBaseUrl();

export const recoverPassword = async email => {
     const response = await fetch(`${BASE_URL}/api/sessions/recoverpassword`, {
          method: 'POST',
          headers: {
                'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({email}),
     });
     const data = await response.json();
    return data
}