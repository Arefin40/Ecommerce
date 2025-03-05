import { pgTable, pgEnum, text, uniqueIndex, timestamp, boolean } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["user", "merchant", "admin"]);

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
      role: userRoleEnum("role").notNull().default("user")
   },
   (t) => [uniqueIndex("email_index").on(t.email)]
);
export type User = typeof user.$inferInsert;

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
