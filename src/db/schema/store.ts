import { pgTable, text, timestamp, integer, uuid, boolean } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { user } from "./users";

export const store = pgTable("store", {
   id: uuid("id")
      .primaryKey()
      .default(sql`uuid_generate_v4()`),
   merchant: text("merchant")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
   name: text("name").notNull(),
   slug: text("slug").notNull(),
   description: text("description").notNull(),
   logo: text("logo"),
   cover: text("cover"),
   totalFollowers: integer("total_followers").notNull().default(0),
   createdAt: timestamp("created_at").notNull().defaultNow(),
   isActive: boolean("is_active").notNull().default(true)
});

export const store_followers = pgTable("store_followers", {
   store: uuid("store")
      .notNull()
      .references(() => store.id, { onDelete: "cascade" }),
   follower: text("follower")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
   followed_at: timestamp("followed_at").notNull().defaultNow()
});
