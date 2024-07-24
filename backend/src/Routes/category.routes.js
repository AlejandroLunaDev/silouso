const Router = require("./router");
const categoryController = require("../Controllers/category.controller");

class CategoryRouter extends Router {
  init() {
    this.get("/", ["PUBLIC"], categoryController.getCategories);
    this.get("/:id", ["PUBLIC"], categoryController.getCategoryById);
    this.post("/", ["ADMIN"], categoryController.addCategory);
    this.put("/:id", ["ADMIN"], categoryController.updateCategory);
    this.delete("/:id", ["ADMIN"], categoryController.deleteCategory);
  }
}

module.exports = new CategoryRouter().getRouter(); // Exporta la instancia del router
