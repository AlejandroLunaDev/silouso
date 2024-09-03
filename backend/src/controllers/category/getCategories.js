const { categoryService } = require("../../services/index.service");

module.exports = async (req, res) => {
  try {
    const categories = await categoryService.getAll();

    return res.sendSuccess(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    req.logger?.error(error.cause || error);
    return res.sendServerError(error.message || error);
  }
};
