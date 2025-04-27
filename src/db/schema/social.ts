import { pgTable, text, timestamp, integer, uuid, index } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { store } from "./store";
import { user } from "./users";
import { product } from "./product";

export const post = pgTable(
   "post",
   {
      id: uuid("id")
         .primaryKey()
         .default(sql`uuid_generate_v4()`),
      store: uuid("store_id")
         .notNull()
         .references(() => store.id, { onDelete: "cascade" }),
      content: text("description").notNull(),
      total_likes: integer("total_likes").notNull().default(0),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
   },
   (t) => [index("by_post_store").on(t.store)]
);

export const post_products = pgTable(
   "post_products",
   {
      post: uuid("post_id")
         .notNull()
         .references(() => post.id, { onDelete: "cascade" }),
      product: uuid("product_id")
         .notNull()
         .references(() => product.id, { onDelete: "cascade" })
   },
   (t) => [index("by_post_product").on(t.product)]
);

export const post_likes = pgTable(
   "post_likes",
   {
      post: uuid("post_id")
         .notNull()
         .references(() => post.id, { onDelete: "cascade" }),
      user: text("user_id")
         .notNull()
         .references(() => user.id, { onDelete: "cascade" })
   },
   (t) => [index("by_like_post").on(t.post)]
);
