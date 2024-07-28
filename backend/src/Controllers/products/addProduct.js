const { productService, categoryService } = require("../../services/index.service");
const CustomError = require("../../utils/CustomErrors/CustomError");
const EErrors = require("../../utils/CustomErrors/EErrors");
const { generateProductErrorInfo } = require("../../utils/CustomErrors/info");
const { uploadToS3 } = require("../../utils/aws");

module.exports = async (req, res) => {
  try {
    const { title, description, price, code, stock, category } = req.body;
    const files = req.files['identification'];

    console.log('Datos recibidos en el backend:', { title, description, price, code, stock, category });

    if (!files || files.length === 0) {
      throw new Error("No files uploaded");
    }

    if (!title || !description || !price || !code || !stock || !category) {
      throw CustomError.createError({
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

    // Buscar la categoría por nombre
    const categoryDoc = await categoryService.findByName(category);
    console.log('Categoría encontrada:', categoryDoc);
    if (!categoryDoc) {
      throw new Error(`Category '${category}' not found`);
    }

    // Subir imágenes a S3
    const imageUrls = await Promise.all(
      files.map(file => uploadToS3(file))
    );
    console.log('URLs de imágenes subidas a S3:', imageUrls);

    const productData = {
      title,
      description,
      price,
      code,
      stock,
      category: categoryDoc.id, // Asegúrate de que categoryDoc tenga el _id
      thumbnails: imageUrls,
      owner: req.user.user.role === "admin" ? "admin" : req.user.user.email
    };

    const product = await productService.create(productData);
    console.log('Producto creado:', product);

    // Realizar populate del producto creado
    const populatedProduct = await productService.getById(product._id, { populate: 'category' });
    console.log('Producto creado con populate:', populatedProduct);

    const options = {
      pagination: false,
    };
    let productos = await productService.get({}, options);
    productos = productos.docs;
    console.log('Productos actualizados:', productos);
    req.io.emit("actualizarProductos", productos);

    return res.sendSuccess(populatedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    req.logger.error(error.cause);
    return res.sendServerError(error.message);
  }
};
