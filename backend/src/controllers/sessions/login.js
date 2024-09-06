module.exports = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.sendUserError("Debe completar todos los campos");
    }

    const user = await userService.getUserByEmail(req.body.email);
    if (!user) {
      return CustomError.createError({
        name: "UserNotFound",
        cause: null,
        message: `User ${req.body.email} doesn't exist`,
        code: EErrors.INVALID_TYPE_ERROR,
      });
    }

    if (!bcrypt.compareSync(req.body.password.trim(), user.password)) {
      return res.sendUserError("Invalid credentials");
    }

    const userLimited = new UserCurrent(user);
    const token = generaJWT(userLimited);

    let cookieOptions = {
      domain: '.silouso.shop',  // Set to frontend domain
      sameSite: 'None',  // Allows cookie usage across domains
      secure: process.env.NODE_ENV === 'production',  // Only send over HTTPS in production
      httpOnly: true,  // Enhances security by preventing JS access
      maxAge: 24 * 60 * 60 * 1000,  // 1 day expiry
    };

    // Set the cookie with proper domain
    res.cookie(config.PASS_COOKIE, token, cookieOptions);
    console.log("Cookie sent:", config.PASS_COOKIE, token, cookieOptions);

    // Update the user's last connection time
    await userService.update(user._id, {
      last_connection: new Date(),
    });

    res.sendSuccess({
      user: {
        id: userLimited.id,
        firstName: userLimited.first_name,
        lastName: userLimited.last_name,
        role: userLimited.role,
      },
    });
  } catch (error) {
    req.logger.error(error.cause);
    return res.sendServerError(error.message);
  }
};
