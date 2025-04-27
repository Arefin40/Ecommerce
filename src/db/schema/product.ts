import {
   pgTable,
   text,
   timestamp,
   integer,
   uuid,
   uniqueIndex,
   serial,
   boolean
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { store } from "./store";
import { user } from "./users";

export const product = pgTable("product", {
   id: uuid("id")
      .primaryKey()
      .default(sql`uuid_generate_v4()`),
   storeId: uuid("store_id")
      .notNull()
      .references(() => store.id, { onDelete: "cascade" }),
   name: text("name").notNull(),
   image: text("image"),
   category: text("category").notNull(),
   description: text("description").notNull(),
   price: integer("price").notNull(),
   stock: integer("stock").notNull(),
   total_sales: integer("total_sales").notNull().default(0),
   total_reviews: integer("total_reviews").notNull().default(0),
   total_likes: integer("total_likes").notNull().default(0),
   createdAt: timestamp("created_at").notNull().defaultNow(),
   isActive: boolean("is_active").notNull().default(true)
});

export const product_images = pgTable(
   "product_images",
   {
      id: serial("id").primaryKey(),
      product: uuid("product")
         .notNull()
         .references(() => product.id, { onDelete: "cascade" }),
      image: text("image").notNull()
   },
   (t) => [uniqueIndex("by_product").on(t.product)]
);

export const product_reviews = pgTable("product_reviews", {
   product: uuid("product")
      .notNull()
      .references(() => product.id, { onDelete: "cascade" }),
   reviewer: text("reviewer"),
   reviewer_id: text("reviewer_id").references(() => user.id, { onDelete: "set null" }),
   rating: integer("rating"),
   comment: text("comment"),
   createdAt: timestamp("created_at").notNull().defaultNow()
});
