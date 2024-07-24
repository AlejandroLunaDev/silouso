// controllers/users/updateRole.js

const { userService } = require("../../services/index.service");
const CustomError = require("../../utils/CustomErrors/CustomError");
const EErrors = require("../../utils/CustomErrors/EErrors");
const fs = require("fs");

module.exports = async (req, res) => {
  const { uid } = req.params;
  const { role: newRole } = req.body;

  try {
    const user = await userService.getById(uid);
    if (!user) {
      throw CustomError.createError({
        name: "UserNotFoundError",
        cause: null,
        message: `Error trying to find a user with the id: ${uid}`,
        code: EErrors.INVALID_TYPE_ERROR,
      });
    }

    const validRoles = ["user", "premium", "admin"];
    if (!validRoles.includes(newRole)) {
      throw CustomError.createError({
        name: "InvalidRoleError",
        cause: null,
        message: `Invalid role: ${newRole}`,
        code: EErrors.INVALID_TYPE_ERROR,
      });
    }

    const newDocuments = user.documents.filter(document => document.name === "profile");
    if (newRole !== "premium") {
      user.documents.forEach(document => {
        if (document.name !== "profile" && document.reference) {
          fs.unlinkSync(document.reference);
        }
      });
    }

    await userService.update(
      { _id: uid },
      { role: newRole, documents: newDocuments }
    );
    const updatedUser = await userService.getById(uid);

    return res.status(200).json({ status: "success", user: updatedUser });
  } catch (error) {
    req.logger.error(error);
    return res.status(500).json({ status: "error", message: error.message });
  }
};
