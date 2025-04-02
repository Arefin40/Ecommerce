"use server";

import { db } from "@/db";
import { user } from "@/db/schema/users";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

interface UpdateProfileData {
   id: string;
   image?: string;
   name?: string;
   email?: string;
}

export async function updateProfile({ id, image, name, email }: UpdateProfileData) {
   // Check if user is authenticated
   const session = await auth.api.getSession({ headers: await headers() });
   if (!session) {
      return {
         success: false,
         error: "Unauthorized: Please sign in to update your profile"
      };
   }

   // Check if user is updating their own profile
   if (session.user.id !== id) {
      return {
         success: false,
         error: "Unauthorized: You can only update your own profile"
      };
   }

   try {
      await db
         .update(user)
         .set({
            ...(image && { image }),
            ...(name && { name }),
            ...(email && { email })
         })
         .where(eq(user.id, id));

      revalidatePath("/profile");
      return { success: true };
   } catch (error) {
      console.error("Error updating profile:", error);
      return { success: false, error: "Failed to update profile" };
   }
}
