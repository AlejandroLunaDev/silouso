const passport = require("passport");
const userModel = require("../dao/mongo/models/user.model");
const google = require("passport-google-oauth20");
const bcrypt = require("bcrypt");
const github = require("passport-github2");
const passportJWT = require("passport-jwt");
const config = require("./config");
const { userService, cartService } = require("../services/index.service");
require('dotenv').config();

// adminCoder@coder.com
//adminCod3r123

const buscaToken = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.coderCookie;

  }
  console.log("Token encontrado:", token);
  return token;
};

const inicializaPassport = () => {
  passport.use(
    "jwt",
    new passportJWT.Strategy(
      {
        jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([buscaToken]),
        secretOrKey: config.PRIVATE_KEY,
      },
      async (contenidoJwt, done) => {
        try {
          return done(null, contenidoJwt.user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  passport.use(
    "github",
    new github.Strategy(
      {
        clientID: config.GITHUB_CLIENT_ID,
        clientSecret: config.GITHUB_CLIENT_SECRET,
        callbackURL:  config.GITHUB_CALLBACK_URL,
 
      },
      async (token, tokenRefresh, profile, done) => {
        try {
          const usuario = await userService.getUserByEmail(profile._json.email);
          if (!usuario) {
            let cartId = await cartService.createCart();
            cartId = cartId._id.toString();
            let newUsuario = {
              first_name: profile._json.name,
              last_name: profile._json.name,
              age: 18,
              email: profile._json.email,
              password: bcrypt.hashSync(
                profile._json.email,
                bcrypt.genSaltSync(10)
              ),
              cartId,
            };
            const result = await userModel.create(newUsuario);
            return done(null, result);
          }
          return done(null, usuario);
        } catch (error) {
          done(error);
        }
      }
    )
  );
  passport.use(
    "google",
    new google.Strategy(
      {
        clientID: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        callbackURL: config.GOOGLE_CALLBACK_URL,
        scope: ['profile', 'email']
      },
      async (token, tokenRefresh, profile, done) => {
        try {
          const usuario = await userService.getUserByEmail(profile._json.email);
          if (!usuario) {
            let cartId = await cartService.createCart();
            cartId = cartId._id.toString();
            let newUsuario = {
              first_name: profile._json.given_name,
              last_name: profile._json.family_name,
              age: 18,
              email: profile._json.email,
              password: bcrypt.hashSync(
                profile._json.email,
                bcrypt.genSaltSync(10)
              ),
              cartId,
            };
            const result = await userModel.create(newUsuario);
            return done(null, result);
          }
          return done(null, usuario);
        } catch (error) {
          done(error);
        }
      }
    )
  );
}; //fin inicializaPassport

module.exports = inicializaPassport;
