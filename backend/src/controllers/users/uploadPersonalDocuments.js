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

    if (!uploadedFiles["dniFront"] || !uploadedFiles["dniBack"]) {
      return res.status(400).json({
        status: "error",
        msg: "Debes subir ambos lados del DNI: frente y verso",
      });
    }

    if (!fullName || !dni || !birthDate || !phone) {
      return res.status(400).json({
        status: "error",
        msg: "Debes proporcionar todos los datos requeridos",
      });
    }

    const dniFrontUrl = await uploadToS3(uploadedFiles["dniFront"][0]);
    const dniBackUrl = await uploadToS3(uploadedFiles["dniBack"][0]);

    const newDocuments = [
      {
        reference: dniFrontUrl,
        fullName,
        dni,
        birthDate: new Date(birthDate),
        phone
      },
      {
        reference: dniBackUrl,
      }
    ];

    await userService.update(
      { _id: user._id },
      { 
        role: "pending",
        documents: [...user.documents, ...newDocuments]
      }
    );

    return res.json({
      status: "success",
      msg: "Datos personales y documentos de identificación subidos correctamente.",
    });
  } catch (error) {
    req.logger.error(error.message);
    return res.status(500).json({ status: "error", msg: "Error al subir los archivos." });
  }
};
