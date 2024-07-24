const { productService } = require("../../services/index.service");
const CustomError = require("../../utils/CustomErrors/CustomError");
const EErrors = require("../../utils/CustomErrors/EErrors");
const { generateProductErrorInfo } = require("../../utils/CustomErrors/info");
const { uploadToS3 } = require("../../utils/aws");

module.exports = async (req, res) => {
  try {
    const { title, description, price, code, stock, category } = req.body;
    const files = req.files['identification'];

    if (!files || files.length === 0) {
      throw new Error("No files uploaded");
    }

    if (!title || !description || !price || !code || !stock || !category) {
      CustomError.createError({
        name: "Error Creating Product",
        cause: generateProductErrorInfo({
          title,
          description: description.toString(),
          code,
          price,
          stock,
          category,
          thumbnails: files
        }),
        message: "Error to create a product",
        code: EErrors.INVALID_TYPE_ERROR,
      });
    }

    // Subir imágenes a S3
    const imageUrls = await Promise.all(
      files.map(file => uploadToS3(file))
    );

    const productData = {
      title,
      description,
      price,
      code,
      stock,
      category,
      thumbnails: imageUrls,
      owner: req.user.user.role === "admin" ? "admin" : req.user.user.email
    };

    const product = await productService.create(productData);

    const options = {
      pagination: false,
    };
    let productos = await productService.get({}, options);
    productos = productos.docs;
    req.io.emit("actualizarProductos", productos);

    return res.sendSuccess(product);
  } catch (error) {
    console.error("Error creating product:", error);
    req.logger.error(error.cause);
    return res.sendServerError(error.message);
  }
};
