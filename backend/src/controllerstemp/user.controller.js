const usersController = {
  userPremium: require("./users/userPremium"),
  uploadDocuments: require("./users/uploadDocuments"),
  getUsers: require("./users/getUsers"),
  changeImageProfile: require("./users/changeImageProfile"),
  deleteUser: require("./users/deleteUser"),
  deleteAllUsersInactive:require('./users/deleteAllUsersInactive'),
  updateRole: require("./users/updateRole"),
  getAdminUsers: require("./users/getAdminUsers"),
  
};

module.exports = usersController;
