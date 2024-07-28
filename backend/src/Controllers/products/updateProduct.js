const { productService } = require("../../services/index.service");
const { uploadToS3 } = require("../../utils/aws");

module.exports = async (req, res) => {
  try {
    const { title, description, price, stock, category, isPromoted } = req.body;
    const pid = req.params.pid;
    const files = req.files['identification']; 

    if (!title || !description || !price || !stock || !category) {
      return res.sendUserError("Faltan datos");
    }

    const existProduct = await productService.getById(pid);
    if (!existProduct) {
      return res.sendUserError("Product doesn't exist");
    }

    let imageUrls = existProduct.thumbnails;
    if (files && files.length > 0) {
      const uploadedImages = await Promise.all(
        files.map(file => uploadToS3(file))
      );
      imageUrls = uploadedImages.map(url => url.Location); 
    }

    const updatedProductData = {
      title,
      description,
      price: parseFloat(price), // Asegurar que el precio sea un número
      stock: parseInt(stock, 10), // Asegurar que el stock sea un entero
      category,
      isPromoted: isPromoted !== undefined ? JSON.parse(isPromoted) : existProduct.isPromoted, // Asegurar que isPromoted sea un booleano
      thumbnails: imageUrls
    };
    console.log('Updating product with data:', updatedProductData);
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
