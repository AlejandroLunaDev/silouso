const Router = require('./router');
const {
  login,
  recoverPassword,
  updatePassword,
  register,
  gitHub,
  callBackGitHub,
  googleLogin,
  callBackGoogle,
  logOut,
  current
} = require('../controllers/sessions.controller');
const passportCall = require('../utils/passportCall');
const authTokenResetPassword = require('../middlewares/authTokenResetPassword');
const loginLimiter = require('../middlewares/loginLimiter'); // Importa el middleware

class SessionsRoutes extends Router {
  init() {
    this.post('/login', ['PUBLIC'], loginLimiter, login); // Aplica el middleware aquí
    this.post('/recoverpassword', ['PUBLIC'], recoverPassword);
    this.post(
      '/updatepassword',
      ['PUBLIC'],
      authTokenResetPassword,
      updatePassword
    );
    this.post('/register', ['PUBLIC'], register);
    this.get('/github', ['PUBLIC'], passportCall('github'));
    this.get(
      '/github/callback',
      ['PUBLIC'],
      passportCall('github'),
      callBackGitHub
    );
    this.get('/google', ['PUBLIC'], passportCall('google'));
    this.get(
      '/google/callback',
      ['PUBLIC'],
      passportCall('google'),
      callBackGoogle
    );
    this.get('/current', ['PUBLIC'], passportCall('jwt'), current);
    this.get('/logout', ['PUBLIC'], logOut);
  }
}

module.exports = new SessionsRoutes();
