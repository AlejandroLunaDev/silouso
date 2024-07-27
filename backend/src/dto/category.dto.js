class CategoryDTO {
  constructor(category) {
    this.id = category._id;
    this.name = category.name;
    this.parentCategory = category.parentCategory;
    this.isAvailable = category.isAvailable;
  }

  static fromModel(categoryModel) {
    return new CategoryDTO({
      id: categoryModel._id,
      name: categoryModel.name,
      parentCategory: categoryModel.parentCategory,
      isAvailable: categoryModel.isAvailable
    });
  }
}

module.exports = CategoryDTO;
