module.exports = async (req, res) => {
    try {
      const user = await userService.getById(req.params.uid);
      if (!user) {
        return res.status(404).json({ status: "error", msg: "User not found" });
      }
  
      const { address, postalCode, neighborhood, city, province } = req.body;
  
      if (!address || !postalCode || !neighborhood || !city || !province) {
        return res.status(400).json({
          status: "error",
          msg: "Debes proporcionar todos los datos de dirección",
        });
      }
  
      const updatedDocuments = user.documents.map(doc => {
        if (doc.name === "address") {
          return {
            ...doc,
            reference: {
              address,
              postalCode,
              neighborhood,
              city,
              province
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
        msg: "Datos de dirección actualizados correctamente.",
      });
    } catch (error) {
      req.logger.error(error.message);
      return res.status(500).json({ status: "error", msg: "Error al actualizar los datos de dirección." });
    }
};
