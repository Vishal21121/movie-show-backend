import { boolean, pgTable, serial, varchar } from "drizzle-orm/pg-core";

const users = pgTable("users", {
  id: serial().primaryKey(),
  username: varchar({ length: 20 }),
  email: varchar({ length: 50 }),
  password: varchar({ length: 20 }),
  refreshToken: varchar({ length: 50 }),
  isEmailVerified: boolean(),
});

export { users };
