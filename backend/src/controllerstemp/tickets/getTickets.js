const TicketService = require("../../services/ticket.service");
const factory = require("../../dao/factory"); // Asegúrate de importar correctamente el factory

module.exports = async (req, res) => {
  try {
    const ticketService = new TicketService(factory.Ticket); // Asegúrate de pasar el DAO correcto
    const tickets = await ticketService.getTickets();
    res.status(200).json(tickets);
  } catch (error) {
    console.error("Error in getTickets controller:", error); // Agrega logging para verificar errores
    res.status(500).json({ message: error.message });
  }
};
