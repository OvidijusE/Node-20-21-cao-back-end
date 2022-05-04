require('dotenv').config();

const PORT = +process.env.PORT || 5000;

// db config
const dbConfig = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

module.exports = {
  PORT,
  dbConfig,
};