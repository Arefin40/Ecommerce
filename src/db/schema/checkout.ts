import {
   pgTable,
   text,
   timestamp,
   uuid,
   integer,
   decimal,
   boolean,
   index
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { user } from "./users";
import { product } from "./product";

export const cartItem = pgTable(
   "cart_items",
   {
      user: text("user_id")
         .notNull()
         .references(() => user.id, { onDelete: "cascade" }),
      product: uuid("product_id")
         .notNull()
         .references(() => product.id, { onDelete: "cascade" }),
      quantity: integer("quantity").notNull().default(1),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
   },
   (t) => [index("by_cart_user").on(t.user)]
);

export const order = pgTable(
   "orders",
   {
      id: uuid("id")
         .primaryKey()
         .default(sql`uuid_generate_v4()`),
      user: text("user_id")
         .notNull()
         .references(() => user.id, { onDelete: "cascade" }),
      orderDate: timestamp("order_date").notNull().defaultNow(),
      shippingDate: timestamp("shipping_date"),
      deliveryDate: timestamp("delivery_date"),
      totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
      isPaid: boolean("is_paid").notNull().default(false),
      status: text("status", {
         enum: ["pending", "shipped", "delivered", "cancelled"]
      })
         .notNull()
         .default("pending"),
      shippingName: text("shipping_name").notNull(),
      shippingContact: text("shipping_contact").notNull(),
      shippingAddress: text("shipping_address").notNull(),
      shippingZone: text("shipping_zone").notNull(),
      shippingArea: text("shipping_area").notNull(),
      billingName: text("billing_name").notNull(),
      billingContact: text("billing_contact").notNull(),
      billingAddress: text("billing_address").notNull(),
      billingZone: text("billing_zone").notNull(),
      billingArea: text("billing_area").notNull(),
      shippingMethod: text("shipping_method", {
         enum: ["STANDARD", "EXPRESS"]
      })
         .notNull()
         .default("STANDARD"),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
   },
   (t) => [index("by_order_user").on(t.user), index("by_order_status").on(t.status)]
);

export const orderItem = pgTable(
   "order_items",
   {
      order: uuid("order_id")
         .notNull()
         .references(() => order.id, { onDelete: "cascade" }),
      product: uuid("product_id")
         .notNull()
         .references(() => product.id, { onDelete: "cascade" }),
      quantity: integer("quantity").notNull().default(1),
      productName: text("product_name").notNull(),
      productPrice: decimal("product_price", { precision: 10, scale: 2 }).notNull(),
      totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
   },
   (t) => [index("by_order_item_order").on(t.order), index("by_order_item_product").on(t.product)]
);

export const payment = pgTable(
   "payments",
   {
      transactionId: text("transaction_id"),
      id: uuid("id")
         .primaryKey()
         .default(sql`uuid_generate_v4()`),
      user: text("user_id")
         .notNull()
         .references(() => user.id, { onDelete: "cascade" }),
      order: uuid("order_id")
         .notNull()
         .references(() => order.id, { onDelete: "cascade" }),
      amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
      paymentDate: timestamp("payment_date").notNull().defaultNow(),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
   },
   (t) => [index("by_payment_user").on(t.user), index("by_payment_order").on(t.order)]
);
