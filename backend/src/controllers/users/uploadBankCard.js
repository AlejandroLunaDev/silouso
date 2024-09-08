module.exports = async (req, res) => {
    try {
      const user = await userService.getById(req.params.uid);
      if (!user) {
        return res.status(404).json({ status: "error", msg: "User not found" });
      }
  
      const { cardNumber, cardHolderName, expirationDate, cvv } = req.body;
  
      if (!cardNumber || !cardHolderName || !expirationDate || !cvv) {
        return res.status(400).json({
          status: "error",
          msg: "Debes proporcionar todos los datos de la tarjeta del banco",
        });
      }
  
      const updatedDocuments = user.documents.map(doc => {
        if (doc.name === "bankCard") {
          return {
            ...doc,
            reference: {
              cardNumber,
              cardHolderName,
              expirationDate: new Date(expirationDate),
              cvv
            }
          };
        }
        return doc;
      });
  
      await userService.update(
        { _id: user._id },
        { documents: updatedDocuments }
      );
  
      return res.json({
        status: "success",
        msg: "Datos de la tarjeta del banco actualizados correctamente.",
      });
    } catch (error) {
      req.logger.error(error.message);
      return res.status(500).json({ status: "error", msg: "Error al actualizar los datos de la tarjeta del banco." });
    }
};
