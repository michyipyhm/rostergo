import { Client } from "pg";

export const pgClient = new Client({
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  });

  pgClient.connect()