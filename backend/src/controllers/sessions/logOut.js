const config = require("../../config/config");

module.exports = (req, res) => {
  // Asegúrate de que las opciones de la cookie sean las mismas que cuando se creó
  const cookieOptions = {
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    secure: process.env.NODE_ENV === 'production', 
    domain: process.env.NODE_ENV === 'production' ? '.silouso.shop' : undefined, // Asegúrate de usar el dominio personalizado
  };

  // Eliminar la cookie con las mismas opciones
  res.clearCookie(config.PASS_COOKIE, cookieOptions);

  // Redirigir a diferentes URL según el entorno
  const redirectUrl = process.env.NODE_ENV === 'production' 
    ? 'https://www.silouso.shop/login' // Producción
    : 'http://localhost:5173/login';   // Desarrollo

  res.status(200).redirect(redirectUrl);
};
