const Pool = require("pg").Pool;

const pool = new Pool({
    user: process.env.PSQL_USER,
    password: process.env.PSQL_PWD,
    host: process.env.PSQL_HOST,
    port: process.env.PSQL_PORT,
    database: process.env.PSQL_DB
});

module.exports = pool;

