import { drizzle } from "drizzle-orm/neon-http";
import logger from "../logger/logger.js";

let db;

const connectToDB = async () => {
  db = drizzle({
    connection: process.env.DATABASE_URL,
    casing: "snake_case",
  });
  const result = await db.execute("select 1");
  return result ? true : false;
};

export { connectToDB, db };
