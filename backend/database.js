const sql = require("mssql");

const config = {
    user: "sa",
    password: "NewStrongPassword123!",
    server: "localhost",
    database: "Company",
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log("Connected to SQL Server");
        return pool;
    })
    .catch(err => {
        console.error("Database connection failed:", err);
        throw err;
    });

module.exports = {
    sql,
    poolPromise
};