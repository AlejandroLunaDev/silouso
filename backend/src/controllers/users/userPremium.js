const { userService } = require("../../services/index.service");
const CustomError = require("../../utils/CustomErrors/CustomError");
const EErrors = require("../../utils/CustomErrors/EErrors");
const { deleteFromS3 } = require("../../utils/aws");

module.exports = async (req, res) => {
  const { uid } = req.params;
  
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

    // Si el usuario es premium, hacemos los cambios
    if (user.role === "premium") {
      const newDocuments = [];
      
      // Recorremos los documentos del usuario
      for (const document of user.documents) {
        // Mantenemos el documento de perfil, eliminamos el resto de S3
        if (document.name === "profile") {
          newDocuments.push({
            name: document.name,
            reference: document.reference,
          });
        } else if (document.reference) {
          // Elimina el archivo de S3
          try {
            await deleteFromS3(document.reference);
          } catch (s3Error) {
            req.logger.error(`Error deleting file from S3: ${s3Error.message}`);
            return res.status(500).json({
              status: "error",
              message: "Error al eliminar archivos del almacenamiento en la nube.",
            });
          }
        }
      }

      // Actualizamos el rol del usuario y sus documentos
      await userService.update(
        { _id: uid },
        { role: "user", documents: newDocuments }
      );

      const updatedUser = await userService.getById(uid);
      return res.status(200).json({
        status: "success",
        user: updatedUser,
      });
    }

    return res.status(200).json({
      status: "error",
      message: `El usuario ${user.email} ya tiene el rol 'user'.`,
    });
  } catch (error) {
    req.logger.error(error.message);
    return res.status(500).json({ status: "error", message: error.message });
  }
};
