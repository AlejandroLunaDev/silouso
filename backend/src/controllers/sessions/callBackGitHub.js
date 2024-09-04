const config = require("../../config/config");
const generaJWT = require("../../utils/generaJWT");
const dotenv = require("dotenv").config();
const { userService } = require("../../services/index.service");

module.exports = async (req, res) => {
  try {
    const user = req.user;

    // Actualiza la fecha de la última conexión
    await userService.update(user._id, {
      last_connection: new Date(),
    });

    const userLimited = {
      id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
      cartId: user.cartId,
      thumbnail: user.avatar || user.thumbnail || '',
    };

    const cookieOptions = {
      maxAge: 1000 * 60 * 60,
      httpOnly: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      secure: process.env.NODE_ENV === 'production',
      domain: process.env.NODE_ENV === 'production' ? '.silouso.shop' : undefined
    };
    
    const token = generaJWT(userLimited);
    res.cookie(config.PASS_COOKIE, token, cookieOptions);

    const redirectURL =
      user.role === 'admin'
        ? process.env.NODE_ENV === 'production'
          ? 'https://silouso.shop/admin'
          : 'http://localhost:5173/admin'
        : process.env.NODE_ENV === 'production'
        ? 'https://silouso.shop/'
        : 'http://localhost:5173/';

    res.status(200).redirect(redirectURL);
  } catch (error) {
    req.logger.error(error);
    res.status(500).send("Error al iniciar sesión");
  }
};
