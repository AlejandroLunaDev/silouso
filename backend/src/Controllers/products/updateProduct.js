const { productService } = require("../../services/index.service");
const { uploadToS3 } = require("../../utils/aws");

module.exports = async (req, res) => {
  try {
    const { title, description, price, stock, category } = req.body;
    const pid = req.params.pid;
    const files = req.files['identification']; // Asegúrate de que `files` sea un array

    if (!title || !description || !price || !stock || !category) {
      return res.sendUserError("Faltan datos");
    }

    const existProduct = await productService.getById(pid);
    if (!existProduct) {
      return res.sendUserError("Product doesn't exist");
    }

    // Subir las nuevas imágenes a S3
    let imageUrls = [];
    if (files && files.length > 0) {
      imageUrls = await Promise.all(
        files.map(file => uploadToS3(file))
      );
    }

    const updatedProductData = {
      title,
      description,
      price,
      stock,
      category,
      thumbnails: imageUrls.map(url => url.Location), // Actualizar solo con las nuevas imágenes
    };

    await productService.update(pid, updatedProductData);

    // Obtener productos actualizados para notificar
    const options = { pagination: false };
    let productos = await productService.get({}, options);
    productos = productos.docs;
    req.io.emit("actualizarProductos", productos);

    return res.sendSuccess();
  } catch (error) {
    req.logger.error(error.message);
    return res.sendServerError(error.message);
  }
};
