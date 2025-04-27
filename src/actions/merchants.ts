"use server";

import { db } from "@/db";
import { Resend } from "resend";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { user, merchant_application } from "@/db/schema/users";
import { MerchantRequestApprovedEmail } from "@/emails/merchant-request-approved";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const resend = new Resend(process.env.RESEND_API_KEY);

interface MerchantApplicationData {
   id: string;
   nid: string;
   mobile: string;
}

export async function merchantApplication({ id, nid, mobile }: MerchantApplicationData) {
   "use server";
   // Check if user is authenticated
   const session = await auth.api.getSession({ headers: await headers() });
   if (!session) return { success: false, error: "Unauthorized Access" };

   try {
      // Check if user exists
      const existingUser = await db.select().from(user).where(eq(user.id, id)).execute();
      if (!existingUser || existingUser.length === 0) {
         return { success: false, error: "Merchant application submission failed" };
      }

      // Create merchant application
      const result = await db
         .insert(merchant_application)
         .values({ userId: id, nid, mobile })
         .execute();
      if (result.rowCount === 0) {
         return { success: false, error: "Failed to create merchant application" };
      }

      revalidatePath("/become-merchant");
      return { success: true, message: "Merchant application submitted successfully" };
   } catch (error) {
      console.error("Error creating merchant application:", error);
      return { success: false, error: "Failed to create merchant application" };
   }
}

export async function getAllMerchantApplications() {
   "use server";
   const merchantApplications = await db
      .select({
         id: merchant_application.id,
         name: user.name,
         nid: merchant_application.nid,
         mobile: merchant_application.mobile,
         status: merchant_application.status
      })
      .from(merchant_application)
      .leftJoin(user, eq(merchant_application.userId, user.id))
      .execute();
   return merchantApplications;
}

export async function approveApplication(id: string) {
   "use server";
   try {
      // Get the merchant application and associated user
      const updatedApplication = await db
         .update(merchant_application)
         .set({ status: "approved" })
         .where(eq(merchant_application.id, id))
         .returning();

      if (!updatedApplication || updatedApplication.length === 0) {
         return { success: false, error: "Merchant application not found" };
      }

      // Get the merchant user
      const merchantUser = await db
         .select()
         .from(user)
         .where(eq(user.id, updatedApplication[0].userId))
         .execute();

      // Send approval email
      const { email, name } = merchantUser[0];
      await resend.emails.send({
         from: "SHOBAI <onboarding@resend.dev>",
         to: email,
         subject: "Merchant Application Approved",
         react: MerchantRequestApprovedEmail({ name })
      });

      revalidatePath("/merchant-requests");
      return { success: true, message: "Merchant approved successfully" };
   } catch (error) {
      console.error("Error approving merchant:", error);
      return { success: false, error: "Failed to approve merchant" };
   }
}

export async function rejectApplication(id: string) {
   "use server";
   try {
      await db
         .update(merchant_application)
         .set({ status: "rejected" })
         .where(eq(merchant_application.id, id))
         .execute();
      revalidatePath("/merchant-requests");
      return { success: true, message: "Merchant application rejected" };
   } catch (error) {
      console.error("Error rejecting merchant:", error);
      return { success: false, error: "Failed to reject merchant application" };
   }
}
