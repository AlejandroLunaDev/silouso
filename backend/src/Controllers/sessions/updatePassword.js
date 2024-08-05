const config = require("../../config/config");
const { userService } = require("../../services/index.service");
const { isValidPassword, createHash } = require("../../utils/bcrypt");
const decodeJWT = require("../../utils/decodeJWT");

module.exports = async (req, res) => {
  const { token, password, password2 } = req.body;

  if (password.trim() === "" || password2.trim() === "") {
    return res.status(400).json({
      status: "error",
      message: "The 'password' field cannot be empty.",
    });
  }
  if (password !== password2) {
    return res.status(400).json({
      status: "error",
      message: "Passwords do not match. Please make sure your passwords match and try again.",
    });
  }

  try {
    const user = decodeJWT(token, process.env.JWT_RESET_PASSWORD_KEY);
    const existingUser = await userService.getById(user.user._id);

    if (!existingUser) {
      return res.status(404).json({
        status: "error",
        message: "User not found.",
      });
    }

    if (isValidPassword(existingUser, password)) {
      return res.status(400).json({
        status: "error",
        message: "You can't enter the same password you had before.",
      });
    }

    const hashedPassword = createHash(password);
    res.clearCookie(config.PASS_COOKIE);
    await userService.update(
      { _id: existingUser._id },
      { password: hashedPassword }
    );

    return res.status(200).json({
      status: "success",
      message: "Password changed successfully.",
    });
  } catch (error) {
    req.logger.error(error.cause);
    return res.status(500).json({
      status: "error",
      message: "An error occurred while processing your request.",
    });
  }
};
