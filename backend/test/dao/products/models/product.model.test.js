const mongoose = require('mongoose');
const { expect } = require('chai');
const Product = require('../../../../src/dao/mongo/models/product.model'); 
const config = require('../../../../src/config/config');

describe('Product Model Tests', () => {
    before(async () => {
        await mongoose.connect(config.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    });

    after(async () => {
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await Product.deleteMany({});
    });

    it('should create a product with valid data', async () => {
        const product = new Product({
            title: 'Test Product',
            description: 'This is a test product',
            price: 100,
            thumbnails: ['http://example.com/image.jpg'],
            code: 'TEST123',
            stock: 10,
            category: new mongoose.Types.ObjectId(),
            status: true,
            owner: 'admin'
        });

        const savedProduct = await product.save();
        
        expect(savedProduct).to.have.property('_id');
        expect(savedProduct.title).to.equal('Test Product');
        expect(savedProduct.price).to.equal(100);
        expect(savedProduct.thumbnails).to.include('http://example.com/image.jpg');
    });

    it('should require a title', async () => {
        const product = new Product({
            description: 'This is a test product',
            price: 100,
            code: 'TEST123',
            stock: 10,
            category: new mongoose.Types.ObjectId(),
            status: true,
            owner: 'admin'
        });

        try {
            await product.save();
            throw new Error('Expected validation error');
        } catch (err) {
            expect(err.errors).to.have.property('title');
        }
    });
});
