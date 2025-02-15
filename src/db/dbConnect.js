import { drizzle } from "drizzle-orm/neon-http";
import logger from "../logger/logger.js";

let db;

const connectToDB = async () => {
  try {
    db = drizzle(process.env.DATABASE_URL);
    const result = await db.execute("select 1");
    return result ? true : false;
  } catch (error) {
    logger.error(error);
    return false;
  }
};

export { connectToDB, db };
