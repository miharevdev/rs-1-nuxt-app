const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "samaellilith",
    host: "localhost",
    port: 5432,
    database: "test_vl"
});

module.exports = pool;