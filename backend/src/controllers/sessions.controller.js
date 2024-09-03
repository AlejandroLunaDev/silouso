const sessionsController = {
  login: require('./sessions/login.js'),
  recoverPassword: require('./sessions/recoverPassword.js'),
  updatePassword: require('./sessions/updatePassword.js'),
  register: require('./sessions/register.js'),
  gitHub: require('./sessions/gitHub.js'),
  callBackGitHub: require('./sessions/callBackGitHub.js'),
  googleLogin: require('./sessions/googleLogin.js'),
  callBackGoogle: require('./sessions/callBackGoogle.js'),
  current: require('./sessions/current.js'),
  logOut: require('./sessions/logOut.js')
};

module.exports = sessionsController;
