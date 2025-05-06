import {
   pgTable,
   text,
   timestamp,
   uuid,
   integer,
   decimal,
   boolean,
   index,
   unique
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { user } from "./users";
import { product } from "./product";
import { coupon } from "./coupon";

export const order = pgTable(
   "orders",
   {
      id: uuid("id")
         .primaryKey()
         .default(sql`uuid_generate_v4()`),
      user: text("user_id")
         .notNull()
         .references(() => user.id, { onDelete: "cascade" }),

      // timestamps
      orderedAt: timestamp("ordered_at").notNull().defaultNow(),
      confirmedAt: timestamp("confirmed_at"),
      fulfilledAt: timestamp("fulfilled_at"),
      shippedAt: timestamp("shipped_at"),
      outForDeliveryAt: timestamp("out_for_delivery_at"),
      deliveredAt: timestamp("delivered_at"),
      cancelledAt: timestamp("cancelled_at"),
      returnedAt: timestamp("returned_at"),

      // status
      status: text("order_status", {
         enum: [
            "pending",
            "confirmed",
            "processing",
            "shipped",
            "out_for_delivery",
            "delivered",
            "cancelled",
            "returned"
         ]
      })
         .notNull()
         .default("pending"),

      // payment details
      isPaid: boolean("is_paid").notNull().default(false),
      totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),

      // coupon & discount
      coupon: uuid("coupon").references(() => coupon.id, { onDelete: "set null" }),
      discountAmount: decimal("discount_amount", { precision: 10, scale: 2 }),

      // shipping details
      shippingName: text("shipping_name").notNull(),
      shippingContact: text("shipping_contact").notNull(),
      shippingAddress: text("shipping_address").notNull(),
      shippingZone: text("shipping_zone").notNull(),
      shippingArea: text("shipping_area").notNull(),

      // billing details
      billingName: text("billing_name").notNull(),
      billingContact: text("billing_contact").notNull(),
      billingAddress: text("billing_address").notNull(),
      billingZone: text("billing_zone").notNull(),
      billingArea: text("billing_area").notNull(),
      shippingMethod: text("shipping_method", { enum: ["STANDARD", "EXPRESS"] })
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
      product: uuid("product_id").references(() => product.id, { onDelete: "set null" }),
      productName: text("product_name").notNull(),
      productPrice: decimal("product_price", { precision: 10, scale: 2 }).notNull(),
      productImage: text("product_image").notNull(),
      quantity: integer("quantity").notNull().default(1),
      totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow()
   },
   (t) => [
      index("by_order_item_order").on(t.order),
      index("by_order_item_product").on(t.product),
      unique("unique_product_per_order").on(t.order, t.product)
   ]
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
   (t) => [
      index("by_payment_user").on(t.user),
      index("by_payment_order").on(t.order),
      unique("unique_payment_per_order").on(t.order)
   ]
);
