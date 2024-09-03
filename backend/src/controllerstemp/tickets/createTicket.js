const TicketService = require("../../services/ticket.service");

module.exports = async (req, res) => {
  try {
    const ticketService = new TicketService();
    const ticket = await ticketService.create(req.body);
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
