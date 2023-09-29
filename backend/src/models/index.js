const Sequelize = require("sequelize");

console.log("Realizando conexão com banco de dados...")

const sequelize = new Sequelize(process.env.RDS_DB_NAME, process.env.RDS_USERNAME, process.env.RDS_PASSWORD, {
  host: process.env.RDS_HOSTNAME,
  port: process.env.RDS_PORT,
  dialect: process.env.DB_DIALECT,
  pool: {
    max: parseInt(process.env.DB_POOL_MAX),
    min: parseInt(process.env.DB_POOL_MIN),
    acquire: parseInt(process.env.DB_POOL_ACQUIRE),
    idle: parseInt(process.env.DB_POOL_IDLE)
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.produtos = require("./produto.model.js")(sequelize, Sequelize);

module.exports = db;