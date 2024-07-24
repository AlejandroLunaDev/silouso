const CategoryDTO = require("../dto/category.dto");

class CategoryService {
  constructor(dao) {
    this.dao = dao; // Usa el DAO directamente sin new
  }

  async getAll(query = {}) {
    const categories = await this.dao.getAllCategories(query);
    return categories.map(category => new CategoryDTO(category));
  }

  async getById(id) {
    const category = await this.dao.getCategoryById(id);
    return new CategoryDTO(category);
  }

  async create(name) {
    const newCategory = await this.dao.createCategory(name);
    return new CategoryDTO(newCategory);
  }

  async update(id, name) {
    const updatedCategory = await this.dao.updateCategory(id, name);
    return new CategoryDTO(updatedCategory);
  }

  async delete(id) {
    const deletedCategory = await this.dao.deleteCategory(id);
    return new CategoryDTO(deletedCategory);
  }
}

module.exports = CategoryService;
