// controllers/products.controller.js
const productsModels = require("../../dao/mongo/models/product.model");
const { productService } = require("../../services/index.service");
const transport = require("../../utils/nodemailer");
const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
  region: 'us-east-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const BUCKET_NAME = 'silouso-tec';

const deleteFromS3 = async (key) => {
  try {
    const params = {
      Bucket: BUCKET_NAME,
      Key: key
    };

    const command = new DeleteObjectCommand(params);
    await s3.send(command);
    console.log(`Successfully deleted ${key} from S3`);
  } catch (error) {
    console.error(`Error deleting ${key} from S3:`, error);
    throw new Error(`Error deleting ${key} from S3`);
  }
};

module.exports = async (req, res) => {
  try {
    const product = await productService.getById(req.params.pid);
    if (!product) {
      return res.json({ status: "error", message: "Product does not exist" });
    }

    if (
      req.user.user.role === "premium" &&
      req.user.user.email !== product.owner
    ) {
      return res.send({
        status: "error",
        message: "Permission Denied",
        details:
          "You do not have the required permissions to delete this product. Please contact our support team for assistance.",
      });
    }

    if (req.user.user.role === "admin" && product.owner !== "admin") {
      await transport.sendMail({
        from: "Admin <ferbeoulvedev@gmail.com>",
        to: product.owner,
        subject: "Product Deleted",
        html: `
        <div>
            <h1>Your product ${product.title} code:${product.code} has been deleted!</h1>
            <p> If you have any further questions or need additional assistance, feel free to contact with any admin.</p>
        </div>
        `,
      });
    }

    // Eliminar imágenes de S3
    const imageKeys = product.thumbnails.map(url => {
      const urlParts = url.split('/');
      return urlParts[urlParts.length - 1]; // Obtener solo la clave del archivo
    });

    await Promise.all(imageKeys.map(key => deleteFromS3(key)));

    // Eliminar el producto de la base de datos
    await productService.delete(req.params.pid);

    const productos = await productsModels.find().lean();
    req.io.emit("actualizarProductos", productos);
    return res.status(200).json({
      status: "success",
      message: "Product Successfully Deleted",
    });
  } catch (error) {
    req.logger.error(error.message);
    return res.sendServerError(error.message);
  }
};
