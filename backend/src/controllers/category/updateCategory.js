const { categoryService } = require("../../services/index.service");
const CustomError = require("../../utils/CustomErrors/CustomError");
const EErrors = require("../../utils/CustomErrors/EErrors");
const { generateCategoryErrorInfo } = require("../../utils/CustomErrors/info"); // Asegúrate de que esta función esté correctamente definida

module.exports = async (req, res) => {
  try {
      const { id } = req.params;
      const { name, parentCategory, isAvailable } = req.body;

      // Verificar que se haya proporcionado el ID
      if (!id) {
          throw CustomError.createError({
              name: "Error Updating Category",
              cause: generateCategoryErrorInfo({ id }),
              message: "Category ID is required",
              code: EErrors.INVALID_TYPE_ERROR,
          });
      }

      // Obtener la categoría existente
      const existingCategory = await categoryService.getById(id);
      if (!existingCategory) {
          throw CustomError.createError({
              name: "Error Updating Category",
              cause: generateCategoryErrorInfo({ id }),
              message: "Category not found",
              code: EErrors.NOT_FOUND_ERROR,
          });
      }

      // Preparar los datos de actualización, conservando los campos no proporcionados
      const updatedCategoryData = {
          name: name !== undefined ? name : existingCategory.name,
          isAvailable: isAvailable !== undefined ? isAvailable : existingCategory.isAvailable,
          parentCategory: parentCategory !== undefined ? parentCategory : existingCategory.parentCategory,
      };

      // Actualizar la categoría
      const updatedCategory = await categoryService.update(id, updatedCategoryData);

      // Emitir actualización si es necesario
      req.io?.emit("actualizarCategorias");

      return res.sendSuccess(updatedCategory);
  } catch (error) {
      console.error("Error updating category:", error);

      // Registrar el error si se dispone de un logger
      req.logger?.error(error.message || error);

      // Enviar una respuesta de error del servidor
      return res.sendServerError(error.message || "An error occurred while updating the category.");
  }
};

