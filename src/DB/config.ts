import knex from "knex";
import dotenv from "dotenv";
dotenv.config();

const knexClient = knex({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    port: 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: true,
  },

  // searchPath: ["knex", "public"],
});

export default knexClient;
