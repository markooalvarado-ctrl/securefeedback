const sql = require("mssql");

const config = {
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  options: { encrypt: true, trustServerCertificate: false }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => pool)
  .catch(err => console.error(err));

module.exports = { sql, poolPromise };