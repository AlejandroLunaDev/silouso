const rateLimit = require('express-rate-limit');

// Configura el rate limiter
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    handler: (req, res) => {
      console.log('Límite de tasa alcanzado para:', req.ip);
      return res.status(429).json({
        message: 'Demasiados intentos de inicio de sesión desde esta IP, por favor intenta de nuevo más tarde.',
      });
    },
  });
  

// Exporta el middleware
module.exports = loginLimiter;
