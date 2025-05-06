import { sql } from "drizzle-orm";
import {
   boolean,
   index,
   integer,
   numeric,
   pgTable,
   text,
   timestamp,
   uuid
} from "drizzle-orm/pg-core";

export const coupon = pgTable(
   "coupons",
   {
      id: uuid("id")
         .primaryKey()
         .default(sql`uuid_generate_v4()`),
      code: text("code").notNull().unique(),
      description: text("description"),
      discountAmount: numeric("discount_amount", { precision: 10, scale: 2 }),
      discountPercent: numeric("discount_percent", { precision: 5, scale: 2 }),
      maxUsage: integer("max_usage").default(1),
      usedCount: integer("used_count").default(0),
      expiresAt: timestamp("expires_at", { withTimezone: true }),
      isActive: boolean("is_active").default(true)
   },
   (t) => [
      index("by_coupon_is_active").on(t.isActive),
      index("by_coupon_expiry").on(t.expiresAt),
      index("by_coupon_code").on(t.code)
   ]
);
