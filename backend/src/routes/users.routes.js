const Router = require('./router');
const {
  userPremium,
  uploadDocuments,
  getUsers,
  changeImageProfile,
  deleteUser,
  deleteAllUsersInactive,
  updateRole,
  getAdminUsers
} = require('../controllerstemp/user.controller');
const uploader = require('../middlewares/multer');
const { getPorudctsByUid } = require('../controllerstemp/products.controller');

class UserRoutes extends Router {
  init() {
    this.get('/premium/:uid', ['ADMIN'], userPremium);
    this.get('/', ['ADMIN', 'USER', 'PREMIUM'], getUsers);
    this.get('/admin', ['ADMIN'], getAdminUsers);
    this.get('/:uid/products', ['USER', 'PREMIUM'], getPorudctsByUid);
    this.post(
      '/imageProfile',
      ['USER', 'PREMIUM'],
      uploader.fields([{ name: 'profile', maxCount: 1 }]),
      changeImageProfile
    );
    this.post(
      '/:uid/documents',
      ['USER'],
      uploader.fields([
        { name: 'identification', maxCount: 1 },
        { name: 'address', maxCount: 1 },
        { name: 'statusaccount', maxCount: 1 },
        { name: 'profile', maxCount: 1 }
      ]),
      uploadDocuments
    );
    this.delete('/:uid', ['ADMIN'], deleteUser);
    this.delete('/', ['ADMIN'], deleteAllUsersInactive);
    this.put('/:uid/role', ['ADMIN'], updateRole);
  }
}

module.exports = new UserRoutes();
