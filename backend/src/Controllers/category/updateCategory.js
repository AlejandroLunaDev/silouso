const { categoryService } = require("../../services/index.service");
const CustomError = require("../../utils/CustomErrors/CustomError");
const EErrors = require("../../utils/CustomErrors/EErrors");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // Verificar que se haya proporcionado el ID y el nombre
    if (!id || !name) {
      CustomError.createError({
        name: "Error Updating Category",
        cause: generateCategoryErrorInfo({ name }),
        message: "Error to update category",
        code: EErrors.INVALID_TYPE_ERROR,
      });
    }

    // Actualizar la categoría
    const updatedCategory = await categoryService.update(id, name);

    // Emitir actualización si es necesario
    req.io?.emit("actualizarCategorias");

    return res.sendSuccess(updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error);
    req.logger?.error(error.cause);
    return res.sendServerError(error.message);
  }
};
