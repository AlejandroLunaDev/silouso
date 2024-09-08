const { userService } = require("../../services/index.service");

module.exports = async (req, res) => {
  try {
    console.log('Request Params:', req.params); // Log para ver los parámetros de la solicitud
    console.log('Request Body:', req.body);

    const user = await userService.getById(req.params.uid);
    if (!user) {
      return res.status(404).json({ status: 'error', msg: 'User not found' });
    }

    // Obtener los datos del cuerpo de la solicitud
    const { address, postalCode, neighborhood, city, province } = req.body;

    // Validar que todos los campos necesarios estén presentes
    if (!address || !postalCode || !neighborhood || !city || !province) {
      return res.status(400).json({
        status: 'error',
        msg: 'Debes proporcionar todos los datos de dirección'
      });
    }

    // Actualizar los campos de dirección en el primer documento dentro del array `documents`
    const updatedUser = await userService.updateDocuments(
      user._id,
      {
        address,
        postalCode,
        neighborhood,
        city,
        province
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ status: 'error', msg: 'Error al actualizar los datos de dirección.' });
    }

    return res.json({
      status: 'success',
      msg: 'Datos de dirección actualizados correctamente.'
    });
  } catch (error) {
    req.logger.error(error.message);
    return res
      .status(500)
      .json({
        status: 'error',
        msg: 'Error al actualizar los datos de dirección.'
      });
  }
};
