"use server";

import { db } from "@/db";
import { eq, and } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { cartItem } from "@/db/schema/checkout";
import { wishlist } from "@/db/schema/social";
import { product } from "@/db/schema/product";

export async function addToCart(productId: string, quantity: number = 1) {
   "use server";
   try {
      const session = await auth.api.getSession({ headers: await headers() });
      if (!session?.user) throw new Error("Unauthorized");

      // Check if product exists
      const productData = await db.select().from(product).where(eq(product.id, productId)).limit(1);
      if (productData.length === 0) {
         return { success: false, error: "Product not found" };
      }

      // Check if item already exists in cart
      const existingItem = await db
         .select()
         .from(cartItem)
         .where(and(eq(cartItem.user, session.user.id), eq(cartItem.product, productId)))
         .limit(1);

      if (existingItem.length > 0) {
         // Update quantity if item exists
         await db
            .update(cartItem)
            .set({ quantity: existingItem[0].quantity + quantity })
            .where(and(eq(cartItem.user, session.user.id), eq(cartItem.product, productId)));
      } else {
         // Add new item to cart
         await db.insert(cartItem).values({
            user: session.user.id,
            product: productId,
            quantity
         });
      }

      revalidatePath("/cart");
      return { success: true, message: "Product added to cart" };
   } catch (error) {
      console.error("Error adding to cart:", error);
      return { success: false, error: "Failed to add product to cart" };
   }
}

export async function getCartItems() {
   "use server";
   try {
      const session = await auth.api.getSession({ headers: await headers() });
      if (!session?.user) throw new Error("Unauthorized");

      const cartItems = await db
         .select({
            user: cartItem.user,
            quantity: cartItem.quantity,
            createdAt: cartItem.createdAt,
            updatedAt: cartItem.updatedAt,
            product: {
               id: product.id,
               name: product.name,
               price: product.price,
               image: product.image
            }
         })
         .from(cartItem)
         .where(eq(cartItem.user, session.user.id))
         .leftJoin(product, eq(cartItem.product, product.id));

      return { success: true, data: cartItems };
   } catch (error) {
      console.error("Error getting cart items:", error);
      return { success: false, error: "Failed to get cart items" };
   }
}

export async function updateCartItemQuantity(productId: string, quantity: number) {
   "use server";
   try {
      const session = await auth.api.getSession({ headers: await headers() });
      if (!session?.user) throw new Error("Unauthorized");

      // Get product stock information
      const productData = await db
         .select({ stock: product.stock })
         .from(product)
         .where(eq(product.id, productId))
         .limit(1);
      if (productData.length === 0) {
         return { success: false, error: "Product not found" };
      }

      // Check for negative quantity
      if (quantity < 0) {
         return { success: false, error: "Quantity cannot be negative" };
      }

      // Check if requested quantity exceeds available stock
      if (quantity > productData[0].stock) {
         return { success: false, error: "Requested quantity exceeds available stock" };
      }

      // Update cart item quantity
      await db
         .update(cartItem)
         .set({ quantity })
         .where(and(eq(cartItem.user, session.user.id), eq(cartItem.product, productId)));

      revalidatePath("/cart");
      return { success: true, message: "Cart updated" };
   } catch (error) {
      console.error("Error updating cart:", error);
      return { success: false, error: "Failed to update cart" };
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
      } else {
         // Add to wishlist
         await db.insert(wishlist).values({
            user: session.user.id,
            product: productId
         });
      }

      revalidatePath(invalidatePath);
      return { success: true, message: "Wishlist updated" };
   } catch (error) {
      console.error("Error toggling wishlist item:", error);
      return { success: false, error: "Failed to update wishlist" };
   }
}

export async function getWishlistItems() {
   "use server";
   try {
      const session = await auth.api.getSession({ headers: await headers() });
      if (!session?.user) throw new Error("Unauthorized");

      const wishlistItems = await db
         .select({
            user: wishlist.user,
            product: {
               id: product.id,
               name: product.name,
               price: product.price,
               image: product.image
            }
         })
         .from(wishlist)
         .where(eq(wishlist.user, session.user.id))
         .leftJoin(product, eq(wishlist.product, product.id));

      return { success: true, data: wishlistItems };
   } catch (error) {
      console.error("Error getting wishlist items:", error);
      return { success: false, error: "Failed to get wishlist items" };
   }
}
