import { pgTable, text, uuid, serial, uniqueIndex, timestamp, boolean } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const user = pgTable(
   "user",
   {
      id: text("id").primaryKey(),
      name: text("name").notNull(),
      email: text("email").notNull().unique(),
      emailVerified: boolean("email_verified").notNull(),
      image: text("image"),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at")
         .notNull()
         .defaultNow()
         .$onUpdate(() => new Date()),
      role: text("role", { enum: ["user", "merchant", "admin"] })
         .notNull()
         .default("user")
   },
   (t) => [uniqueIndex("email_index").on(t.email)]
);

export type User = typeof user.$inferInsert;

export const address = pgTable(
   "address",
   {
      id: uuid("id")
         .primaryKey()
         .default(sql`uuid_generate_v4()`),
      name: text("name").notNull(),
      address: text("address").notNull(),
      contact: text("contact").notNull(),
      userId: text("user_id")
         .notNull()
         .references(() => user.id, { onDelete: "cascade" }),
      zone: serial("zone")
         .notNull()
         .references(() => zone.id, { onDelete: "cascade" }),
      area: serial("area")
         .notNull()
         .references(() => area.id, { onDelete: "cascade" }),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at")
         .notNull()
         .defaultNow()
         .$onUpdate(() => new Date())
   },
   (t) => [uniqueIndex("name_user_unique").on(t.name, t.userId)]
);

export const zone = pgTable("zone", {
   id: serial("id").primaryKey(),
   name: text("name").notNull()
});

export const area = pgTable("area", {
   id: serial("id").primaryKey(),
   name: text("name").notNull(),
   zone: serial("zone")
      .notNull()
      .references(() => zone.id, { onDelete: "cascade" })
});

export const session = pgTable("session", {
   id: text("id").primaryKey(),
   expiresAt: timestamp("expires_at").notNull(),
   token: text("token").notNull().unique(),
   createdAt: timestamp("created_at").notNull().defaultNow(),
   updatedAt: timestamp("updated_at")
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
   ipAddress: text("ip_address"),
   userAgent: text("user_agent"),
   userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" })
});

export const account = pgTable("account", {
   id: text("id").primaryKey(),
   accountId: text("account_id").notNull(),
   providerId: text("provider_id").notNull(),
   userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
   accessToken: text("access_token"),
   refreshToken: text("refresh_token"),
   idToken: text("id_token"),
   accessTokenExpiresAt: timestamp("access_token_expires_at"),
   refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
   scope: text("scope"),
   password: text("password"),
   createdAt: timestamp("created_at").notNull().defaultNow(),
   updatedAt: timestamp("updated_at")
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date())
});

export const verification = pgTable("verification", {
   id: text("id").primaryKey(),
   identifier: text("identifier").notNull(),
   value: text("value").notNull(),
   expiresAt: timestamp("expires_at").notNull(),
   createdAt: timestamp("created_at").notNull().defaultNow(),
   updatedAt: timestamp("updated_at")
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date())
});

export const merchant_application = pgTable("merchant_application", {
   id: uuid("id")
      .primaryKey()
      .default(sql`uuid_generate_v4()`),
   userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
   image: text("image"),
   nid: text("nid").notNull(),
   mobile: text("mobile").notNull(),
   comment: text("comment"),
   status: text("application_status", { enum: ["pending", "approved", "rejected"] })
      .notNull()
      .default("pending"),
   createdAt: timestamp("created_at").notNull().defaultNow()
});
