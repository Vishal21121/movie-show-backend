import {
  boolean,
  integer,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

const contentWishlist = pgTable("contentWishlist", {
  id: serial().primaryKey(),
  contentId: integer(),
  title: varchar({ length: 100 }),
  imageUrl: varchar(),
  contentType: varchar({ length: 100 }),
});

export { contentWishlist };
