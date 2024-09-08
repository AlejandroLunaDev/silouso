const config = require("../../config/config");

module.exports = (req, res) => {
  res.clearCookie(config.PASS_COOKIE);
  
  // Redirigir a diferentes URL según el entorno
  const redirectUrl = process.env.NODE_ENV === 'production' 
    ? 'https://www.silouso.shop/login' // Producción
    : 'http://localhost:5173/login';   // Desarrollo

  res.status(200).redirect(redirectUrl);
};
