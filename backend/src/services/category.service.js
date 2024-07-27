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

  async create(name, parentCategory = null, isAvailable = true) {
    const newCategory = await this.dao.createCategory(name, parentCategory, isAvailable);
    return new CategoryDTO(newCategory);
  }

  async update(id, updatedCategoryData) {
    const updatedCategory = await this.dao.updateCategory(id, updatedCategoryData);
    return new CategoryDTO(updatedCategory);
  }

  async delete(id) {
    const deletedCategory = await this.dao.deleteCategory(id);
    return new CategoryDTO(deletedCategory);
  }

  async updateAvailability(id, isAvailable) {
    const updatedCategory = await this.dao.updateCategoryAvailability(id, isAvailable);
    return new CategoryDTO(updatedCategory);
  }
}

module.exports = CategoryService;


module.exports = CategoryService;
