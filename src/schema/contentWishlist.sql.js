import {
  boolean,
  integer,
  pgTable,
  serial,
  varchar,
  uuid,
} from "drizzle-orm/pg-core";
import { users } from "./users.sql.js";

const contentWishlist = pgTable("contentWishlist", {
  id: uuid("id").primaryKey().defaultRandom(),
  contentId: integer(),
  title: varchar({ length: 100 }),
  imageUrl: varchar(),
  description: varchar(),
  contentType: varchar({ length: 100 }),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id),
});

export { contentWishlist };
