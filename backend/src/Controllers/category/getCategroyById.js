const { categoryService } = require("../../services/index.service");
const CustomError = require("../../utils/CustomErrors/CustomError");
const EErrors = require("../../utils/CustomErrors/EErrors");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar que el ID se haya proporcionado
    if (!id) {
      CustomError.createError({
        name: "Error Fetching Category",
        message: "Category ID must be provided",
        code: EErrors.INVALID_TYPE_ERROR,
      });
    }

    // Obtener la categoría
    const category = await categoryService.getById(id);

    if (!category) {
      CustomError.createError({
        name: "Error Fetching Category",
        message: "Category not found",
        code: EErrors.NOT_FOUND_ERROR,
      });
    }

    return res.sendSuccess(category);
  } catch (error) {
    console.error("Error fetching category by ID:", error);
    req.logger?.error(error.cause);
    return res.sendServerError(error.message);
  }
};
