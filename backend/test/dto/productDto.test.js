const { expect } = require('chai');
const ProductDto = require('../../src/dto/Product.dto');

describe('ProductDto Tests', () => {
    it('should correctly map product data to DTO', () => {
        const product = {
            title: 'Product Title',
            description: 'Product Description',
            price: 100,
            thumbnails: ['image1.jpg'],
            code: 'PROD123',
            owner: 'Owner ID',
            stock: 50,
            category: 'Category ID',
            status: 'active',
            isPromoted: true
        };

        const dto = new ProductDto(product);

        expect(dto).to.deep.equal({
            title: 'Product Title',
            description: 'Product Description',
            price: 100,
            thumbnails: ['image1.jpg'],
            code: 'PROD123',
            owner: 'Owner ID',
            stock: 50,
            category: 'Category ID',
            status: 'active',
            isPromoted: true
        });
    });
});
