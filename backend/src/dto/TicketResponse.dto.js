class TicketResponse {
  constructor(ticket) {
    this.code = ticket.code;
    this.amount = ticket.amount;
    this.purchaser = ticket.purchaser;
    this.purchase_datetime = ticket.createdAt;
    this.products = ticket.products;
  }
}

module.exports = TicketResponse;
