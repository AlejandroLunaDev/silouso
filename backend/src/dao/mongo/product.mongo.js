const productModel = require("./models/product.model");
const mongoose = require("mongoose");
class Product {
  constructor(model) {
    this.productModel = productModel;
  }

  async getProducts(query, options) {
    options.populate = 'category';
    return await productModel.paginate(query, options);
  }

  async getProductById(pid) {
    if (!mongoose.Types.ObjectId.isValid(pid)) throw new Error("pid invalid");

 // Depuración
    const product = await this.productModel.findOne({ _id: pid })
      .populate({
        path: 'category',
        populate: {
          path: 'parentCategory',
          model: 'Category'
        }
      })
      .exec();
    console.log('Found product:', product); // Depuración
    return product;
  }

  async addProduct(product) {
    return await productModel.create(product);
  }

  async updateProduct(pid, product) {
    return await productModel.updateOne({ _id: pid }, product);
  }

  async deleteProduct(pid) {
    return await productModel.deleteOne({ _id: pid });
  }

  async deleteProducts(owner) {
    return await productModel.deleteMany({
      owner,
    });
  }
}

module.exports = Product;
