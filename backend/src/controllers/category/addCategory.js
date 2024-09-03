const { categoryService } = require("../../services/index.service");
const CustomError = require("../../utils/CustomErrors/CustomError");
const EErrors = require("../../utils/CustomErrors/EErrors");
const { generateCategoryErrorInfo } = require("../../utils/CustomErrors/info");

module.exports = async (req, res) => {
  try {
    const { name, parentCategory, isAvailable } = req.body;

    // Validar que se haya proporcionado el nombre de la categoría
    if (!name) {
      CustomError.createError({
        name: "Error Creating Category",
        cause: generateCategoryErrorInfo({ name }),
        message: "Error to create a category",
        code: EErrors.INVALID_TYPE_ERROR,
      });
    }
    const categoryIsAvailable = isAvailable === undefined ? true : isAvailable;
    // Crear la nueva categoría
    const category = await categoryService.create(name, parentCategory, categoryIsAvailable);

    // Emitir actualización si es necesario (ejemplo, si se usa un sistema de eventos)
    req.io?.emit("actualizarCategorias");

    return res.sendSuccess(category);
  } catch (error) {
    console.error("Error creating category:", error);
    req.logger?.error(error.cause);
    return res.sendServerError(error.message);
  }
};
