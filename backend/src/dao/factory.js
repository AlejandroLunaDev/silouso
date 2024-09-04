const config = require("../config/config");
const MongoSingleton = require("./mongo/MongoSingleton");

// Conéctate a la base de datos MongoDB
MongoSingleton.connectDb(config.MONGO_URL);

// Importa los modelos de MongoDB
const User = require("./mongo/user.mongo");
const Product = require("./mongo/product.mongo");
const Cart = require("./mongo/cart.mongo");
const Ticket = require("./mongo/ticket.mongo");
const Category = require("./mongo/category.mongo");

module.exports = {
  User,
  Product,
  Cart,
  Ticket,
  Category
};
