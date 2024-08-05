const mongoose = require('mongoose');
const { expect } = require('chai');
const User = require('../../../../src/dao/mongo/models/user.model');
const config = require('../../../../src/config/config');

describe('User Model Tests', () => {
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
        await User.deleteMany({});
    });

    it('should create a user with valid data', async () => {
        const cartId = new mongoose.Types.ObjectId();
        const user = new User({
            first_name: 'Test',
            last_name: 'User',
            age: '30',
            email: 'testuser@example.com',
            password: 'securepassword',
            cartId: cartId,
            role: 'user',
            avatar: 'http://example.com/avatar.jpg',
            documents: [
                {
                    name: 'document1',
                    reference: 'http://example.com/doc1.pdf'
                }
            ]
        });

        const savedUser = await user.save();
        
        const savedUserObject = savedUser.toObject();

        // Remove non-comparable fields
        const { _id, __v, last_connection, ...savedUserData } = savedUserObject;

        // Transform ObjectId to string for comparison
        savedUserData.cartId = savedUserData.cartId.toString();
        savedUserData.documents = savedUserData.documents.map(doc => ({
            name: doc.name,
            reference: doc.reference
        }));

        const expectedData = {
            first_name: 'Test',
            last_name: 'User',
            age: '30',
            email: 'testuser@example.com',
            password: 'securepassword',
            cartId: cartId.toString(),
            role: 'user',
            avatar: 'http://example.com/avatar.jpg',
            documents: [
                {
                    name: 'document1',
                    reference: 'http://example.com/doc1.pdf'
                }
            ]
        };

        try {
            expect(savedUserData).to.deep.equal(expectedData);
        } catch (err) {
            console.error('Comparison Error:', err);
            throw err;
        }
    });

    it('should require first_name', async () => {
        const user = new User({
            last_name: 'User',
            age: '30',
            email: 'testuser@example.com',
            password: 'securepassword'
        });

        try {
            await user.save();
            throw new Error('Expected validation error');
        } catch (err) {
            expect(err.errors).to.have.property('first_name');
        }
    });

    it('should require email', async () => {
        const user = new User({
            first_name: 'Test',
            last_name: 'User',
            age: '30',
            password: 'securepassword'
        });

        try {
            await user.save();
            throw new Error('Expected validation error');
        } catch (err) {
            expect(err.errors).to.have.property('email');
        }
    });

    it('should require password', async () => {
        const user = new User({
            first_name: 'Test',
            last_name: 'User',
            age: '30',
            email: 'testuser@example.com'
        });

        try {
            await user.save();
            throw new Error('Expected validation error');
        } catch (err) {
            expect(err.errors).to.have.property('password');
        }
    });

    it('should have default role as "user"', async () => {
        const user = new User({
            first_name: 'Test',
            last_name: 'User',
            age: '30',
            email: 'testuser@example.com',
            password: 'securepassword'
        });

        const savedUser = await user.save();
        expect(savedUser.role).to.equal('user');
    });
});
