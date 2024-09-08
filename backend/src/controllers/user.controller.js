const usersController = {
  userPremium: require("./users/userPremium"),
  uploadPersonalDocuments: require("./users/uploadPersonalDocuments"), // Nuevo controlador
  uploadAddress: require("./users/uploadAddress"), // Nuevo controlador
  uploadBankCard: require("./users/uploadBankCard"), // Nuevo controlador
  getUsers: require("./users/getUsers"),
  changeImageProfile: require("./users/changeImageProfile"),
  deleteUser: require("./users/deleteUser"),
  deleteAllUsersInactive: require('./users/deleteAllUsersInactive'),
  updateRole: require("./users/updateRole"),
  getAdminUsers: require("./users/getAdminUsers"),
};

module.exports = usersController;
