const Router = require('./router');
const {
  userPremium,
  uploadPersonalDocuments,
  uploadAddress,
  uploadBankCard,
  getUsers,
  changeImageProfile,
  deleteUser,
  deleteAllUsersInactive,
  updateRole,
  getAdminUsers
} = require('../controllers/user.controller');
const uploader = require('../middlewares/multer');
const { getProductsByUid } = require('../controllers/products.controller'); // Asegúrate de que este sea el nombre correcto

class UserRoutes extends Router {
  init() {
    this.get('/premium/:uid', ['ADMIN'], userPremium);
    this.get('/', ['ADMIN', 'USER', 'PREMIUM'], getUsers);
    this.get('/admin', ['ADMIN'], getAdminUsers);
    this.get('/:uid/products', ['USER', 'PREMIUM'], getProductsByUid); // Corrige el nombre aquí

    // Ruta para cambiar la imagen de perfil
    this.post(
      '/imageProfile',
      ['USER', 'PREMIUM'],
      uploader.fields([{ name: 'profile', maxCount: 1 }]),
      changeImageProfile
    );

    // Ruta para la subida de documentos personales
    this.post(
      '/:uid/documents/personal',
      ['USER'],
      uploader.fields([
        { name: 'dniFront', maxCount: 1 },
        { name: 'dniBack', maxCount: 1 },
      ]),
      uploadPersonalDocuments
    );

    // Ruta para la subida de dirección
    this.post(
      '/:uid/documents/address',
      ['USER'],
      uploader.fields([
        { name: 'address', maxCount: 1 },
        { name: 'postalCode', maxCount: 1 },
        { name: 'neighborhood', maxCount: 1 },
        { name: 'city', maxCount: 1 },
        { name: 'province', maxCount: 1 }
      ]),
      uploadAddress
    );

    // Ruta para la subida de datos de la tarjeta del banco
    this.post(
      '/:uid/documents/bankcard',
      ['USER'],
      uploader.fields([
        { name: 'bankCard', maxCount: 1 }
      ]),
      uploadBankCard
    );

    this.delete('/:uid', ['ADMIN'], deleteUser);
    this.delete('/', ['ADMIN'], deleteAllUsersInactive);
    this.put('/:uid/role', ['ADMIN'], updateRole);
  }
}

module.exports = new UserRoutes();
