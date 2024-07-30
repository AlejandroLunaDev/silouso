const mongoose = require('mongoose');
const { cartService, productService } = require("../../services/index.service");

module.exports = async (req, res) => {
  const { quantity } = req.body;
  const { pid, cid } = req.params;

  if (!quantity)
    return res.status(400).json({ error: "Debe ingresar la cantidad (quantity)" });

  try {
    if (!mongoose.Types.ObjectId.isValid(pid))
      return res.status(400).json({ error: "ID de producto inválido (pid)" });
    if (!mongoose.Types.ObjectId.isValid(cid))
      return res.status(400).json({ error: "ID de carrito inválido (cid)" });

    const existsProduct = await productService.getById(pid);
    if (!existsProduct)
      return res.status(404).json({ error: "Producto no encontrado" });

    const existsCart = await cartService.getById(cid);
    if (!existsCart)
      return res.status(404).json({ error: "Carrito no encontrado" });

    console.log('Carrito encontrado:', existsCart);

    // Busca el producto en el carrito
    const productModify = existsCart.products.find(
      product => product.product._id.toString() === pid
    );

    console.log('Producto encontrado en el carrito:', productModify);

    if (!productModify)
      return res.status(404).json({ error: "El producto no existe en el carrito" });

    // Actualiza la cantidad del producto
    productModify.quantity = +quantity;
    
    // Actualiza el carrito con los productos modificados
    await cartService.update(cid, existsCart.products);

    return res.status(200).json({ status: "OK", msg: "Cantidad del producto modificada" });
  } catch (error) {
    req.logger.error(error.message);
    return res.status(500).json({ error: "Error del servidor" });
  }
};
