const config = require("../../config/config");
const { userService } = require("../../services/index.service");
const CustomError = require("../../utils/CustomErrors/CustomError");
const EErrors = require("../../utils/CustomErrors/EErrors");
const generateTokenResetPassword = require("../../utils/generateTokenResetPassword");
const transport = require("../../utils/nodemailer");

module.exports = async (req, res, next) => {
  const { email } = req.body;

  const userDB = await userService.getUserByEmail(email);
  try {
    if (!userDB) {
      CustomError.createError({
        name: "Could not find user",
        cause: null,
        message: "Error trying to find a user with the email: " + email,
        code: EErrors.INVALID_TYPE_ERROR,
      });
    }

    const token = generateTokenResetPassword(userDB);
    //guardar token BD para poder eliminarlo despues de usarlo
    let result = await transport.sendMail({
      from: "SiLoUsotec <silousotec@gmail.com>",
      to: email,
      subject: "Recover password",
      html: `
  <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
          <h1 style="color: #333;">Recuperar Contraseña</h1>
          <p style="color: #555; font-size: 16px;">Haga clic en el botón a continuación para recuperar su contraseña. Este enlace solo es válido por 1 hora.</p>
          <a href="${config.SERVER}/resetpassword?token=${token}" style="
            display: inline-block;
            padding: 15px 25px;
            margin: 20px 0;
            font-size: 16px;
            font-weight: bold;
            color: #fff;
            background-color: #61005e;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s ease;
          ">Recuperar Contraseña</a>
          <p style="color: #888; font-size: 12px;">Si no solicitó este cambio, por favor ignore este correo.</p>
        </div>
      `,
    });
    res.status(200).json({ status: "success" });
  } catch (error) {
    req.logger.error(error.cause);
    return res.sendServerError(error.message);
  }
};
