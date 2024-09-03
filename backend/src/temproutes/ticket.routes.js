const Router = require("./router");
const {
  getTickets,
  getTicketById,
  createTicket,
  getTotalSales,
  getMonthlySales,
} = require("../Controllers/tickets.controller");

class TicketsRouter extends Router {
  init() {
    this.get("/", ["ADMIN"], getTickets);
    this.get("/:id", ["ADMIN"], getTicketById);
    this.post("/", ["ADMIN"], createTicket);
    this.get("/sales/total", ["ADMIN"], getTotalSales);
    this.get("/sales/monthly", ["ADMIN"], getMonthlySales);
  }
}

module.exports = new TicketsRouter().getRouter();
