const sinon = require('sinon');
const { expect } = require('chai');
const ProductsService = require('../../src/services/products.service');
const ProductDao = require('../../src/dao/mongo/product.mongo');

describe('ProductsService Tests', function() {
    let service;
    let daoStub;

    beforeEach(() => {
        daoStub = sinon.createStubInstance(ProductDao);
        service = new ProductsService();
        service.dao = daoStub;
    });

    it('should get products', async () => {
        const products = [{ title: 'Product 1' }, { title: 'Product 2' }];
        daoStub.getProducts.resolves(products);

        const result = await service.get({});
        expect(result).to.deep.equal(products);
    });

    it('should get product by ID', async () => {
        const pid = '123';
        const options = {}; // Puedes especificar opciones si es necesario
        const product = { _id: pid, title: 'Product 1' };
        daoStub.getProductById.resolves(product);
    
        const result = await service.getById(pid, options);
    
      
    
        expect(result).to.deep.equal(product);
        expect(daoStub.getProductById.calledOnceWithExactly(pid, options)).to.be.true;
    });
    
    
    
    
    

    

    it('should create a new product', async () => {
        const product = { title: 'Product 1' };
        const createdProduct = { _id: '123', ...product };
        daoStub.addProduct.resolves(createdProduct);

        const result = await service.create(product);
        expect(result).to.deep.equal(createdProduct);
    });

    it('should update a product', async () => {
        const pid = '123';
        const product = { title: 'Updated Product' };
        const updatedProduct = { _id: pid, ...product };
        daoStub.updateProduct.resolves(updatedProduct);

        const result = await service.update(pid, product);
        expect(result).to.deep.equal(updatedProduct);
    });

    it('should delete a product', async () => {
        const pid = '123';
        daoStub.deleteProduct.resolves(true);

        const result = await service.delete(pid);
        expect(result).to.be.true;
    });

    it('should delete products by owner', async () => {
        const owner = 'owner123';
        daoStub.deleteProducts.resolves(true);

        const result = await service.deleteByOwner(owner);
        expect(result).to.be.true;
    });
});
