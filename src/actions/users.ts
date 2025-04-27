"use server";
import { db } from "@/db";
import { user } from "@/db/schema/users";
import { eq, ne } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getAllUsers() {
   "use server";
   const session = await auth.api.getSession({ headers: await headers() });
   if (!session) {
      throw new Error("User not authenticated");
   }

   const users = await db
      .select({
         id: user.id,
         name: user.name,
         email: user.email,
         image: user.image,
         role: user.role
      })
      .from(user)
      .where(ne(user.id, session.user.id));
   return users;
}

export async function changeRole(id: string, role: string) {
   "use server";
   await db
      .update(user)
      .set({ role: role as "user" | "admin" })
      .where(eq(user.id, id));
   revalidatePath("/manage-users");
   return { success: true, message: "Role updated successfully" };
}
