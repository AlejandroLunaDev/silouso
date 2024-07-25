const BASE_URL = 'http://localhost:8080';

export const getTickets = async () => {

  
    try {
      const response = await fetch(`${BASE_URL}/api/tickets`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Agrega otros encabezados necesarios si los tienes
        },
        credentials: "include",
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error fetching tickets:", error);
      throw error; // Re-lanza el error para que pueda ser manejado donde se llame a esta función
    }
  };
  