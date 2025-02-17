import { boolean, pgTable, serial, uuid, varchar } from "drizzle-orm/pg-core";

const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: varchar({ length: 20 }),
  email: varchar({ length: 50 }),
  password: varchar({ length: 50 }),
  refreshToken: varchar({ length: 50 }),
  isEmailVerified: boolean().default(false),
});

export { users };
