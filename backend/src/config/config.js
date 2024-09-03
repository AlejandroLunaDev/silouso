const dotenv = require("dotenv").config();

const config = {
  SERVER: process.env.SERVER_FRONT,
  PORT: process.env.PORT || 3000,
  MONGO_URL: process.env.MONGO_URL,
  DB_NAME: process.env.DB_NAME,
  PERSISTENCE: process.env.PERSISTENCE || "FS",
  NODEMAILER_PASS: process.env.NODEMAILER_PASS,
  NODEMAILER_GMAIL: process.env.NODEMAILER_GMAIL,
  JWT_RESET_PASSWORD_KEY: process.env.JWT_RESET_PASSWORD_KEY,
  PRIVATE_KEY: process.env.PRIVATE_KEY,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
  CALLBACK_URL: process.env.CALLBACK_URL,
  PASS_COOKIE: process.env.PASS_COOKIE,
  MONGO_URL_TEST: process.env.MONGO_URL_TEST,
  PRODUCTION_URL: process.env.PRODUCTION_URL,
  MODE: process.env.MODE || "production",
};

module.exports = config;
