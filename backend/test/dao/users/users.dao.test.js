const { expect } = require('chai');
const mongoose = require('mongoose');
const User = require('../../../src/dao/mongo/models/user.model');
const UserDao = require('../../../src/dao/mongo/user.mongo'); // Ajusta la ruta según tu estructura
const config = require('../../../src/config/config');

// Crea una instancia del DAO para probar
const userDao = new UserDao(User);

describe('User DAO Tests', () => {
    before(async () => {
        await mongoose.connect(config.MONGO_URL_TEST, {
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

    it('should add and retrieve a user', async () => {
        const cartId = new mongoose.Types.ObjectId();
        const user = {
            first_name: 'John',
            last_name: 'Doe',
            age: '30',
            email: 'john.doe@example.com',
            password: 'securepassword',
            cartId: cartId,
            role: 'user',
            avatar: 'http://example.com/avatar.jpg',
            documents: [
                {
                    name: 'doc1',
                    reference: 'http://example.com/doc1.pdf'
                }
            ]
        };
    
        const addedUser = await userDao.addUser(user);
        const retrievedUser = await userDao.getUserById(addedUser._id);
    
        // Verifica que los datos del usuario sean correctos
        expect(retrievedUser).to.deep.include({
            first_name: 'John',
            last_name: 'Doe',
            age: '30',
            email: 'john.doe@example.com',
            password: 'securepassword',
            role: 'user',
            avatar: 'http://example.com/avatar.jpg'
        });
    
        // Verifica el cartId por separado
        expect(retrievedUser.cartId.toString()).to.equal(cartId.toString());
    
        // Elimina el campo _id de los documentos para comparación
        const expectedDocuments = user.documents.map(doc => ({
            name: doc.name,
            reference: doc.reference
        }));
        
        const actualDocuments = retrievedUser.documents.map(doc => ({
            name: doc.name,
            reference: doc.reference
        }));
    
        // Verifica los documentos sin el campo _id
        expect(actualDocuments).to.deep.equal(expectedDocuments);
    });
    
    

    it('should update a user', async () => {
        const user = {
            first_name: 'John',
            last_name: 'Doe',
            age: '30',
            email: 'john.doe@example.com',
            password: 'securepassword',
            cartId: new mongoose.Types.ObjectId(),
            role: 'user',
            avatar: 'http://example.com/avatar.jpg'
        };

        const addedUser = await userDao.addUser(user);
        const updateData = { age: '31' };
        await userDao.updateUser(addedUser._id, updateData);

        const updatedUser = await userDao.getUserById(addedUser._id);
        expect(updatedUser.age).to.equal('31');
    });

    it('should delete a user', async () => {
        const user = {
            first_name: 'John',
            last_name: 'Doe',
            age: '30',
            email: 'john.doe@example.com',
            password: 'securepassword',
            cartId: new mongoose.Types.ObjectId(),
            role: 'user',
            avatar: 'http://example.com/avatar.jpg'
        };

        const addedUser = await userDao.addUser(user);
        await userDao.deleteUser(addedUser._id);

        const deletedUser = await userDao.getUserById(addedUser._id);
        expect(deletedUser).to.be.null;
    });

    it('should update user documents', async () => {
        const user = {
            first_name: 'John',
            last_name: 'Doe',
            age: '30',
            email: 'john.doe@example.com',
            password: 'securepassword',
            cartId: new mongoose.Types.ObjectId(),
            role: 'user',
            avatar: 'http://example.com/avatar.jpg'
        };
    
        const addedUser = await userDao.addUser(user);
        const newDocuments = [
            {
                name: 'doc2',
                reference: 'http://example.com/doc2.pdf'
            }
        ];
    
        await userDao.updateUserDocuments(addedUser._id, newDocuments);
        const updatedUser = await userDao.getUserById(addedUser._id);
        
        // Comparar los documentos sin el campo _id
        const expectedDocuments = newDocuments.map(doc => ({
            name: doc.name,
            reference: doc.reference
        }));
        
        const actualDocuments = updatedUser.documents.map(doc => ({
            name: doc.name,
            reference: doc.reference
        }));
    
        expect(actualDocuments).to.deep.equal(expectedDocuments);
    });
    
});
