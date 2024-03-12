const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "samaellilith",
    host: "127.0.0.1",
    port: 5432,
    database: "test_vl"
});

module.exports = pool;