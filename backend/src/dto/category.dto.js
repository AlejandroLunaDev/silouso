// dto/category.dto.js

class CategoryDTO {
    constructor(category) {
      this.id = category._id;
      this.name = category.name;
    }
  
    static fromModel(categoryModel) {
      return new CategoryDTO({
        id: categoryModel._id,
        name: categoryModel.name
      });
    }
  }
  
  module.exports = CategoryDTO;
  