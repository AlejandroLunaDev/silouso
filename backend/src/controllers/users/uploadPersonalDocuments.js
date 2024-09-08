const { userService } = require("../../services/index.service");
const { uploadToS3 } = require("../../utils/aws");

module.exports = async (req, res) => {
  try {
    const user = await userService.getById(req.params.uid);
    if (!user) {
      return res.status(404).json({ status: "error", msg: "User not found" });
    }

    const uploadedFiles = req.files;
    const { fullName, dni, birthDate, phone } = req.body;

    // Validar que ambos archivos del DNI hayan sido subidos
    if (!uploadedFiles["dniFront"] || !uploadedFiles["dniBack"]) {
      return res.status(400).json({
        status: "error",
        msg: "Debes subir ambos lados del DNI: frente y verso",
      });
    }

    // Validar que todos los datos necesarios estén presentes
    if (!fullName || !dni || !birthDate || !phone) {
      return res.status(400).json({
        status: "error",
        msg: "Debes proporcionar todos los datos requeridos",
      });
    }

    // Subir archivos a S3
    const dniFrontUrl = await uploadToS3(uploadedFiles["dniFront"][0]);
    const dniBackUrl = await uploadToS3(uploadedFiles["dniBack"][0]);

    // Crear un nuevo documento para los datos del usuario
    const newDocument = {
      reference: {
        dniFront: dniFrontUrl,
        dniBack: dniBackUrl,
      },
      fullName,
      dni,
      birthDate: new Date(birthDate),
      phone
    };

    // Actualizar el usuario con los nuevos documentos
    const updatedUser = await userService.update(
      { _id: user._id },
      {
        documents: [...user.documents, newDocument]
      }
    );

    // Obtener los datos actualizados del usuario
    const userData = await userService.getById(user._id);

    return res.json({
      status: "success",
      msg: "Datos personales y documentos de identificación subidos correctamente.",
      user: userData,  // Devolver los datos actualizados del usuario
    });
  } catch (error) {
    req.logger.error(error.message);
    return res.status(500).json({ status: "error", msg: "Error al subir los archivos." });
  }
};
