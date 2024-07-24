const ticketsController = {
    createTicket: require("./tickets/createTicket"),
    getTickets: require("./tickets/getTickets"),
    getTicketById: require("./tickets/getTicketById"),
    getTotalSales: require("./tickets/getTotalSales"),
    getMonthlySales: require("./tickets/getMonthlySales"),
  };
  
  module.exports = ticketsController;
  