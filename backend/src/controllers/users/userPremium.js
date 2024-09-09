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

    // Si el usuario es premium, realizamos los cambios
    if (user.role === "premium") {
      // Borrar todo el contenido del campo documents
      const clearedDocuments = {
        reference: {
          dniFront: '',
          dniBack: '',
        },
        fullName: '',
        dni: '',
        birthDate: null,
        phone: '',
        address: '',
        postalCode: '',
        neighborhood: '',
        city: '',
        province: '',
        bankCard: {
          cardNumber: '',
          cardHolderName: '',
          expirationDate: null,
          cvv: '',
        }
      };

      // Actualizamos el rol del usuario y vaciamos el campo documents
      await userService.update(
        { _id: uid },
        { role: "user", documents: clearedDocuments }
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
