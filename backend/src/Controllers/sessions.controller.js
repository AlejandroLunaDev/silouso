const sessionsController = {
  login: require("./sessions/login"),
  recoverPassword:require("./sessions/recoverPassword"),
  updatePassword:require('./sessions/updatePassword'),
  register: require("./sessions/register"),
  gitHub: require("./sessions/gitHub"),
  callBackGitHub: require("./sessions/callBackGitHub"),
  googleLogin: require("./sessions/googleLogin"),
  callBackGoogle: require("./sessions/callBackGoogle"),
  current: require("./sessions/current.js"),
  logOut: require("./sessions/logOut")
};

module.exports = sessionsController;
