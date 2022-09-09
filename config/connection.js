const Sequelize = require("sequelize");
require("dotenv").config();


const sequelize = new Sequelize(
    // DB NAME
    process.env.DB_NAME,
    // Name
    process.env.DB_USERNAME,
    // PASSWORD
    process.env.DP_PASSWORD,

{
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  }
);



module.exports = sequelize;