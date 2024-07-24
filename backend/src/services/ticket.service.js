const Ticket = require("../dto/Ticket.dto");

class TicketService {
  constructor(dao) {
    this.dao = new dao();
  }
  async getTickets() {
    return await this.dao.getTickets();
  }
  async create(ticketData) {
    console.log('Creating Ticket with Data:', ticketData);
    return await this.dao.createTicket(ticketData);
  }
  
  
  async getTicketById(cid) {
    return await this.dao.getTicketById(cid);
  }
}
module.exports = TicketService;
