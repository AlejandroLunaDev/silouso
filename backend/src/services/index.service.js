const { User, Product, Cart, Ticket, Category } = require("../dao/factory");
const UsersService = require("../services/users.service");
const ProductsService = require("../services/products.service");
const CartsService = require("../services/carts.service");
const TicketService = require("../services/ticket.service");
const CategoryService = require("../services/category.service");

const userService = new UsersService(User);
const productService = new ProductsService(Product);
const cartService = new CartsService(Cart);
const ticketService = new TicketService(Ticket);
const categoryService = new CategoryService(Category);

module.exports = { userService, cartService, productService, ticketService, categoryService };
