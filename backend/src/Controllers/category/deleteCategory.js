const { categoryService } = require("../../services/index.service");
const CustomError = require("../../utils/CustomErrors/CustomError");
const EErrors = require("../../utils/CustomErrors/EErrors");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar que el ID se haya proporcionado
    if (!id) {
      CustomError.createError({
        name: "Error Deleting Category",
        message: "Category ID must be provided",
        code: EErrors.INVALID_TYPE_ERROR,
      });
    }

    // Eliminar la categoría
    const category = await categoryService.delete(id);

    // Emitir actualización si es necesario
    req.io?.emit("actualizarCategorias");

    return res.sendSuccess(category);
  } catch (error) {
    console.error("Error deleting category:", error);
    req.logger?.error(error.cause);
    return res.sendServerError(error.message);
  }
};
