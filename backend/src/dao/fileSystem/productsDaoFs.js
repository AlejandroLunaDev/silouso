import fs from 'fs';
import config from '../Configs/config.js';
import path from 'path';
import { io } from '../app.js';

const productosFilePath = path.join(config.DIRNAME, './Mocks/productos.json'); 

const productsController = {
  getAllProducts: (req, res) => {
    try {
      const products = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));
      res.render('realTimeProducts', { products });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los productos' });
    }
  },
  getProductById: (req, res) => {
    try {
      const productId =Number(req.params.pid);
      const products = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));
      const product = products.find(product => product.id === productId);
      if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el producto por ID' });
    }
  },
  addProduct: (req, res) => {
    try {

      console.log(req.body)
      const products = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));
      const newProduct = {
        id: products.length + 1,
        title: req.body.title,
        description: req.body.description,
        code: req.body.code,
        price: req.body.price,
        status: true,
        stock: req.body.stock,
        category: req.body.category,
        thumbnails: req.body.thumbnails || []
      };

      products.push(newProduct);
      fs.writeFileSync(productosFilePath, JSON.stringify(products, null, 2));

      const socketServer = req.app.get('socketServer')
      socketServer.emit('newProduct', newProduct);

      res.status(200).send(newProduct);

    } catch (error) {
      res.status(500).json({ error: 'Error al agregar el producto' });
    }
  },
  updateProduct: (req, res) => {
    try {
      const productId =Number(req.params.pid) ;
      const updatedFields = req.body;

      const products = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));
      const index = products.findIndex(product => product.id === productId);
      if (index === -1) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }

      products[index] = { ...products[index], ...updatedFields };
      fs.writeFileSync(productosFilePath, JSON.stringify(products, null, 2));

      res.json(products[index]);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el producto' });
    }
  },
  deleteProduct: (req, res) => {
    try {
      const productId =Number(req.params.pid) ;
      const products = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));
      const filteredProducts = products.filter(product => product.id !== productId);
      if (filteredProducts.length === products.length) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      fs.writeFileSync(productosFilePath, JSON.stringify(filteredProducts, null, 2));


      res.status(200).send({ message: 'Producto eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el producto' });
    }
  }
};

export default productsController;
