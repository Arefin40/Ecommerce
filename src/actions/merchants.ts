"use server";

import { db } from "@/db";
import { user, merchant_application } from "@/db/schema/users";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

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

export async function changeStatus(id: string, status: string) {
   "use server";
   try {
      await db
         .update(merchant_application)
         .set({ status: status as "pending" | "approved" | "rejected" })
         .where(eq(merchant_application.id, id))
         .execute();
      revalidatePath("/merchant-requests");
      return { success: true, message: "Status updated successfully" };
   } catch (error) {
      console.error("Error updating status:", error);
      return { success: false, error: "Failed to update status" };
   }
}
