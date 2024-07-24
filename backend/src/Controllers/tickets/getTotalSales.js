const TicketService = require("../../services/ticket.service");

module.exports = async (req, res) => {
  try {
    const ticketService = new TicketService();
    const tickets = await ticketService.getTickets();
    const totalSales = tickets.reduce((sum, ticket) => sum + ticket.amount, 0);
    res.status(200).json({ totalSales });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
