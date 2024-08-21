const mongoose = require('mongoose');
const { expect } = require('chai');
const ProductDAO = require('../../../src/dao/mongo/product.mongo'); 
const Product = require('../../../src/dao/mongo/models/product.model');
const config = require('../../../src/config/config');
const Category = require('../../../src/dao/mongo/models/category.model');

describe('Product DAO Tests', () => {
    let productDAO;
    
    // Conectar a la base de datos de prueba antes de las pruebas
    before(async () => {
        await mongoose.connect(config.MONGO_URL_TEST, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        productDAO = new ProductDAO(Product);
    });

    // Cerrar la conexión a la base de datos después de las pruebas
    after(async () => {
        await mongoose.connection.close();
    });

    // Limpia la base de datos antes de cada prueba
    beforeEach(async () => {
        await Product.deleteMany({});
    });

    // Prueba la creación de un producto
    it('should add and retrieve a product', async () => {
        const product = {
            title: 'Test Product',
            description: 'This is a test product',
            price: 100,
            thumbnails: ['http://example.com/image.jpg'],
            code: 'TEST123',
            stock: 10,
            category: new mongoose.Types.ObjectId(),
            status: true,
            owner: 'admin'
        };

        const addedProduct = await productDAO.addProduct(product);
        const retrievedProduct = await productDAO.getProductById(addedProduct._id.toString());

        expect(retrievedProduct).to.have.property('_id');
        expect(retrievedProduct.title).to.equal('Test Product');
        expect(retrievedProduct.price).to.equal(100);
        expect(retrievedProduct.thumbnails).to.include('http://example.com/image.jpg');
    });

    // Prueba la actualización de un producto
    it('should update a product', async () => {
        const product = {
            title: 'Test Product',
            description: 'This is a test product',
            price: 100,
            thumbnails: ['http://example.com/image.jpg'],
            code: 'TEST123',
            stock: 10,
            category: new mongoose.Types.ObjectId(),
            status: true,
            owner: 'admin'
        };

        const addedProduct = await productDAO.addProduct(product);
        const updatedData = { price: 150 };
        
        await productDAO.updateProduct(addedProduct._id.toString(), updatedData);
        const updatedProduct = await productDAO.getProductById(addedProduct._id.toString());

        expect(updatedProduct.price).to.equal(150);
    });

    // Prueba la eliminación de un producto
    it('should delete a product', async () => {
        const product = {
            title: 'Test Product',
            description: 'This is a test product',
            price: 100,
            thumbnails: ['http://example.com/image.jpg'],
            code: 'TEST123',
            stock: 10,
            category: new mongoose.Types.ObjectId(),
            status: true,
            owner: 'admin'
        };

        const addedProduct = await productDAO.addProduct(product);
        await productDAO.deleteProduct(addedProduct._id.toString());

        const deletedProduct = await productDAO.getProductById(addedProduct._id.toString());
        expect(deletedProduct).to.be.null;
    });

    // Prueba la eliminación de productos por propietario
    it('should delete products by owner', async () => {
        const product1 = {
            title: 'Product 1',
            description: 'Description 1',
            price: 100,
            thumbnails: ['http://example.com/image1.jpg'],
            code: 'CODE1',
            stock: 10,
            category: new mongoose.Types.ObjectId(),
            status: true,
            owner: 'admin'
        };

        const product2 = {
            title: 'Product 2',
            description: 'Description 2',
            price: 200,
            thumbnails: ['http://example.com/image2.jpg'],
            code: 'CODE2',
            stock: 20,
            category: new mongoose.Types.ObjectId(),
            status: true,
            owner: 'admin'
        };

        await productDAO.addProduct(product1);
        await productDAO.addProduct(product2);
        await productDAO.deleteProducts('admin');

        const remainingProducts = await Product.find();
        expect(remainingProducts).to.have.lengthOf(0);
    });
});
