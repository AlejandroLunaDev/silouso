const config = {
  PORT: process.env.PORT || 8080,
  PRODUCTION_URL: process.env.PRODUCTION_URL,
  MONGO_URL: process.env.MONGO_URL,
  MONGO_URL_TEST: process.env.MONGO_URL_TEST,
  DB_NAME: process.env.DB_NAME,
  PRIVATE_KEY: process.env.PRIVATE_KEY,
  PERSISTENCE: process.env.PERSISTENCE,
  SECRET_JWT: process.env.SECRET_JWT,
  SERVER_FRONT: process.env.SERVER_FRONT,

  GITHUB_CALLBACK_URL: process.env.NODE_ENV === 'production'
    ? process.env.GITHUB_CALLBACK_URL_PROD
    : process.env.GITHUB_CALLBACK_URL,
  GOOGLE_CALLBACK_URL: process.env.NODE_ENV === 'production'
    ? process.env.GOOGLE_CALLBACK_URL_PROD
    : process.env.GOOGLE_CALLBACK_URL,

  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

  PASS_COOKIE: process.env.PASS_COOKIE,
  JWT_RESET_PASSWORD_KEY: process.env.JWT_RESET_PASSWORD_KEY,
  NODEMAILER_GMAIL: process.env.NODEMAILER_GMAIL,
  NODEMAILER_PASS: process.env.NODEMAILER_PASS,

  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
};

module.exports = config;
