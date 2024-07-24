const TicketService = require("../../services/ticket.service");

module.exports = async (req, res) => {
  try {
    const ticketService = new TicketService();
    const ticket = await ticketService.getTicketById(req.params.id);
    if (ticket) {
      res.status(200).json(ticket);
    } else {
      res.status(404).json({ message: "Ticket not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
