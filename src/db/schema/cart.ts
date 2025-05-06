import { pgTable, text, primaryKey, uuid, integer, index, numeric } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { user } from "./users";
import { product } from "./product";

export const cart = pgTable(
   "cart",
   {
      id: uuid("id")
         .primaryKey()
         .default(sql`uuid_generate_v4()`),
      user: text("user_id")
         .notNull()
         .references(() => user.id, { onDelete: "cascade" }),
      totalQuantity: integer("total_quantity").notNull().default(0),
      totalPrice: numeric("total_price", { precision: 10, scale: 2 }).notNull().default("0.00")
   },
   (t) => [index("by_cart_user").on(t.user)]
);

export const cartItem = pgTable(
   "cart_items",
   {
      cartId: uuid("cart_id")
         .notNull()
         .references(() => cart.id, { onDelete: "cascade" }),
      product: uuid("product_id")
         .notNull()
         .references(() => product.id, { onDelete: "cascade" }),
      quantity: integer("quantity").notNull().default(1)
   },
   (t) => [index("by_cart_id").on(t.cartId), primaryKey({ columns: [t.cartId, t.product] })]
);
