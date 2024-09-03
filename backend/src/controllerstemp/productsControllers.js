import { getAllProducts, getProductById, addProduct as addProductDao, updateProduct as updateProductDao, deleteProduct as deleteProductDao } from '../dao/db/productDaoMongo.js';

class ProductsController {
    async getAllProductsController(req, res) {
        try {
            const products = await getAllProducts();
           /*  res.status(200).json(products); */
            return {products}
        } catch (error) {
            console.error('Error al obtener todos los productos:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    async getProductByIdController(req, res) {
        const productId = req.params.pid;
        try {
            const product = await getProductById(productId);
            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            res.status(200).json(product);
        } catch (error) {
            console.error('Error al obtener el producto por ID:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    async addProductController(req, res) {
        const productData = req.body;
        try {
            const newProduct = await addProductDao(productData);
            res.status(201).json({ message: 'Producto agregado exitosamente', product: newProduct });
        } catch (error) {
            console.error('Error al agregar el producto:', error.message);
            res.status(400).json({ message: error.message });
        }
    }

    async updateProductController(req, res) {
        const productId = req.params.pid;
        const newData = req.body;
        try {
            const updatedProduct = await updateProductDao(productId, newData);
            if (!updatedProduct) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            res.status(200).json({ message: 'Producto actualizado correctamente', product: updatedProduct });
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    async deleteProductController(req, res) {
        const productId = req.params.pid;
        try {
            const deletedProduct = await deleteProductDao(productId);
            if (!deletedProduct) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            res.status(200).json({ message: 'Producto eliminado correctamente', product: deletedProduct });
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
}

export default new ProductsController();
