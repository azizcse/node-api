const dotenv = require('dotenv')
const { Pool, Client } = require("pg");
dotenv.config()

const credentials = {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
  };

  const dbPool = ()=>{
    const pool = new Pool(credentials);
    return pool
  }

  module.exports = dbPool