const Category = require('../mongo/models/category.model');

class CategoryDAO {
  async createCategory(name, parentCategory = null, isAvailable = true) {
    try {
      const category = new Category({ name, parentCategory, isAvailable });
      return await category.save();
    } catch (error) {
      throw new Error(`Error creating category: ${error.message}`);
    }
  }

  async getAllCategories() {
    try {
      return await Category.find().populate('parentCategory');
    } catch (error) {
      throw new Error(`Error fetching categories: ${error.message}`);
    }
  }

  async getCategoryById(id) {
    try {
      return await Category.findById(id).populate('parentCategory');
    } catch (error) {
      throw new Error(`Error fetching category by ID: ${error.message}`);
    }
  }

  async updateCategory(id, updatedCategoryData) {
    try {
      return await Category.findByIdAndUpdate(
        id,
        updatedCategoryData,
        { new: true }
      );
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

  async updateCategoryAvailability(id, isAvailable) {
    try {
      return await Category.findByIdAndUpdate(
        id, 
        { isAvailable }, 
        { new: true }
      );
    } catch (error) {
      throw new Error(`Error updating category availability: ${error.message}`);
    }
  }

  async findCategoryByName(name) {
    try {
      return await Category.findOne({ name });
    } catch (error) {
      throw new Error(`Error finding category by name: ${error.message}`);
    }
  }
}

module.exports = new CategoryDAO();

