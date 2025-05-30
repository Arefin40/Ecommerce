"use server";

import { db } from "@/db";
import { eq, and } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { wishlist } from "@/db/schema/social";
import { product } from "@/db/schema/product";

type wishlistItem = { id: string; name: string; price: number; image: string };

export async function getWishlistItems() {
   "use server";
   try {
      const session = await auth.api.getSession({ headers: await headers() });
      if (!session?.user) throw new Error("Unauthorized");

      const wishlistItems = await db
         .select({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image
         })
         .from(wishlist)
         .where(eq(wishlist.user, session.user.id))
         .leftJoin(product, eq(wishlist.product, product.id));

      return { success: true, data: wishlistItems as wishlistItem[] };
   } catch (error) {
      console.error("Error getting wishlist items:", error);
      return { success: false, error: "Failed to get wishlist items" };
   }
}

export async function toggleWishlistItem(productId: string, invalidatePath = "/wishlist") {
   "use server";
   try {
      const session = await auth.api.getSession({ headers: await headers() });
      if (!session?.user) throw new Error("Unauthorized");

      // Check if item exists in wishlist
      const existingItem = await db
         .select()
         .from(wishlist)
         .where(and(eq(wishlist.user, session.user.id), eq(wishlist.product, productId)))
         .limit(1);

      if (existingItem.length > 0) {
         // Remove from wishlist
         await db
            .delete(wishlist)
            .where(and(eq(wishlist.user, session.user.id), eq(wishlist.product, productId)));

         revalidatePath(invalidatePath);
         return { success: true, message: "Wishlist updated", action: "removed" };
      }

      // Add to wishlist
      await db.insert(wishlist).values({ user: session.user.id, product: productId });
      revalidatePath(invalidatePath);
      return { success: true, message: "Wishlist updated", action: "added" };
   } catch (error) {
      console.error("Error toggling wishlist item:", error);
      return { success: false, error: "Failed to update wishlist" };
   }
}

export async function clearWishlist() {
   "use server";
   try {
      const session = await auth.api.getSession({ headers: await headers() });
      if (!session?.user) throw new Error("Unauthorized");

      await db.delete(wishlist).where(eq(wishlist.user, session.user.id));

      revalidatePath("/wishlist");
      return { success: true, message: "Wishlist cleared" };
   } catch (error) {
      console.error("Error clearing wishlist:", error);
      return { success: false, error: "Failed to clear wishlist" };
   }
}
