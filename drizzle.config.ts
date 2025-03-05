import type { Config } from "drizzle-kit";
import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";

config({ path: ".env.local" });

export default defineConfig({
   schema: "./src/db/schema",
   out: "./src/db/migrations",
   dialect: "postgresql",
   dbCredentials: {
      url: process.env.DATABASE_URL!
   },
   verbose: true,
   strict: true
} satisfies Config);
