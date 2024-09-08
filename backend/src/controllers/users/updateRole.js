const { userService } = require("../../services/index.service");
const CustomError = require("../../utils/CustomErrors/CustomError");
const EErrors = require("../../utils/CustomErrors/EErrors");

module.exports = async (req, res) => {
  const { uid } = req.params;
  const { role: newRole } = req.body;
  const currentUser = req.user; // Obtenemos el usuario que hace la solicitud

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

    // Si el usuario quiere actualizar su rol a premium, validamos que tenga los documentos completos
    if (newRole === "premium" && currentUser.role !== "admin") {
      const requiredDocuments = ["identification", "address", "statusaccount"];

      const hasAllDocuments = requiredDocuments.every(docName =>
        user.documents.some(document => document.name === docName && document.reference)
      );

      if (!hasAllDocuments) {
        throw CustomError.createError({
          name: "IncompleteDocumentsError",
          cause: null,
          message: "User does not have all required documents to upgrade to premium.",
          code: EErrors.MISSING_DOCUMENTS_ERROR,
        });
      }
    }

    // Si el rol es diferente de premium, eliminamos los documentos adicionales
    const newDocuments = user.documents.filter(document => document.name === "profile");
    if (newRole !== "premium") {
      // Aquí se eliminarían las referencias a los documentos no necesarios si es necesario.
      // Ejemplo: Actualizar las referencias en el almacenamiento en la nube si es necesario.
    }

    // Actualizamos el rol y los documentos
    await userService.update(
      { _id: uid },
      { role: newRole, documents: newRole === "premium" ? user.documents : newDocuments }
    );
    const updatedUser = await userService.getById(uid);

    return res.status(200).json({ status: "success", user: updatedUser });
  } catch (error) {
    req.logger.error(error);
    return res.status(500).json({ status: "error", message: error.message });
  }
};
