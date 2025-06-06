const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres.nckycekwhzmdibtjquxv",
  password: "Pageupanddown2-",
  host: "aws-0-ap-south-1.pooler.supabase.com",
  port: 5432,
  database: "postgres",
  ssl: {
    rejectUnauthorized: false // Required for Supabase
  }
});

module.exports = pool;
