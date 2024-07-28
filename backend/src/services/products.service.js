// src/services/products.service.js

const ProductDao = require('../dao/mongo/product.mongo');
const ProductDto = require("../dto/Product.dto");

class ProductsService {
  constructor() {
    this.dao = new ProductDao();
  }

  async get(query = {}, options = { pagination: false, lean: true }) {
    return await this.dao.getProducts(query, options);
  }

  async getById(pid, options = {}) {
    return await this.dao.getProductById(pid, options);
  }

  async create(product) {
    const newProduct = new ProductDto(product);
    return await this.dao.addProduct(newProduct);
  }

  async update(pid, product) {
    const newProduct = new ProductDto(product);
    return await this.dao.updateProduct(pid, newProduct);
  }

  async delete(pid) {
    return await this.dao.deleteProduct(pid);
  }

  async deleteByOwner(owner) {
    return await this.dao.deleteProducts(owner);
  }
}

module.exports = ProductsService;
