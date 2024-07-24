import express from 'express';
import productsController from '../Controllers/productsControllers.js';

const productsRouter = express.Router();

productsRouter.get('/', productsController.getAllProductsController); 
productsRouter.get('/:pid', productsController.getProductByIdController); 
productsRouter.post('/', productsController.addProductController); 
productsRouter.put('/:pid', productsController.updateProductController); 
productsRouter.delete('/:pid', productsController.deleteProductController); 

export default productsRouter;
