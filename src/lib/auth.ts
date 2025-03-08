import { Resend } from "resend";
import { ResetPasswordEmail } from "@/emails";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import * as schema from "@/db/schema";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
   database: drizzleAdapter(db, {
      provider: "pg",
      schema: schema
   }),

   emailAndPassword: {
      enabled: true,
      sendResetPassword: async ({ user, url }) => {
         await resend.emails.send({
            from: "SHOBAI <orboarding@resend.dev>",
            to: user.email,
            subject: "Reset your password",
            react: ResetPasswordEmail({ name: user.name, resetUrl: url })
         });
      }
   },

   user: {
      additionalFields: {
         role: {
            type: "string",
            required: false,
            defaultValue: "user",
            input: false
         }
      }
   },

   socialProviders: {
      google: {
         clientId: process.env.GOOGLE_CLIENT_ID as string,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
      }
   }
});
