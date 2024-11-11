require("dotenv").config();

module.exports = {
  dataBaseUrl: process.env.DATABASE_URL,
  port: process.env.PORT || 3000,
};