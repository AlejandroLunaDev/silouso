// dao/category.mongo.js

const Category = require('./models/category.model');

class CategoryDAO {
  async createCategory(name) {
    try {
      const category = new Category({ name });
      return await category.save();
    } catch (error) {
      throw new Error(`Error creating category: ${error.message}`);
    }
  }

  async getAllCategories() {
    try {
      return await Category.find();
    } catch (error) {
      throw new Error(`Error fetching categories: ${error.message}`);
    }
  }

  async getCategoryById(id) {
    try {
      return await Category.findById(id);
    } catch (error) {
      throw new Error(`Error fetching category by ID: ${error.message}`);
    }
  }

  async updateCategory(id, name) {
    try {
      return await Category.findByIdAndUpdate(id, { name }, { new: true });
    } catch (error) {
      throw new Error(`Error updating category: ${error.message}`);
    }
  }

  async deleteCategory(id) {
    try {
      return await Category.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting category: ${error.message}`);
    }
  }
}

module.exports = new CategoryDAO();
