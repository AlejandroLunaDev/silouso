const TicketService = require("../../services/ticket.service");

module.exports = async (req, res) => {
  try {
    const ticketService = new TicketService();
    const tickets = await ticketService.getTickets();
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const salesLastMonth = tickets
      .filter(ticket => new Date(ticket.purchase_datatime) >= lastMonth)
      .reduce((sum, ticket) => sum + ticket.amount, 0);

    const currentMonth = new Date();
    currentMonth.setDate(1);
    const salesCurrentMonth = tickets
      .filter(ticket => new Date(ticket.purchase_datatime) >= currentMonth)
      .reduce((sum, ticket) => sum + ticket.amount, 0);

    res.status(200).json({ salesLastMonth, salesCurrentMonth });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
