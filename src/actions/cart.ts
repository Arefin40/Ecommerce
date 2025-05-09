"use server";

import { db } from "@/db";
import { eq, and, sql } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { cart, cartItem } from "@/db/schema/cart";
import { product } from "@/db/schema/product";
import { store } from "@/db/schema/store";

async function find_or_create_Cart() {
   "use server";
   try {
      const session = await auth.api.getSession({ headers: await headers() });
      if (!session?.user) throw new Error("Unauthorized");

      const existingCart = await db
         .select({ id: cart.id })
         .from(cart)
         .where(eq(cart.user, session.user.id))
         .limit(1);

      if (existingCart.length > 0) {
         return existingCart[0].id;
      }

      // Create new cart if not found
      const [newCart] = await db
         .insert(cart)
         .values({ user: session.user.id })
         .returning({ id: cart.id });

      return newCart.id;
   } catch {
      throw new Error("Failed to find or create cart");
   }
}

export async function addToCart(productId: string) {
   "use server";
   try {
      const session = await auth.api.getSession({ headers: await headers() });
      if (!session?.user) throw new Error("Unauthorized");

      // Check if product exists
      const productData = await db
         .select({
            store: { merchant: store.merchant },
            stock: product.stock,
            price: product.price
         })
         .from(product)
         .where(eq(product.id, productId))
         .limit(1)
         .leftJoin(store, eq(product.storeId, store.id));
      if (productData.length === 0) {
         return { success: false, error: "Product not found" };
      }

      // Check if the product is owned by the logged in merchant
      if (productData[0]?.store?.merchant === session.user.id) {
         return { success: false, error: "Cannot add own product to cart" };
      }

      const cartId = await find_or_create_Cart();
      const existingItem = await db
         .select()
         .from(cartItem)
         .where(and(eq(cartItem.cartId, cartId), eq(cartItem.product, productId)))
         .limit(1);

      if (existingItem.length > 0) {
         if (existingItem[0].quantity + 1 > productData[0].stock) {
            return { success: false, error: "Quantity exceeds available stock" };
         }

         await db
            .update(cartItem)
            .set({ quantity: existingItem[0].quantity + 1 })
            .where(and(eq(cartItem.cartId, cartId), eq(cartItem.product, productId)));
      } else {
         await db.insert(cartItem).values({ cartId: cartId, product: productId, quantity: 1 });
      }

      await updateCartTotals(cartId);

      revalidatePath("/cart");
      return { success: true, message: "Product added to cart" };
   } catch (error) {
      console.error("Error adding to cart:", error);
      return { success: false, error: "Failed to add product to cart" };
   }
}

export async function getCart() {
   "use server";
   try {
      const session = await auth.api.getSession({ headers: await headers() });
      if (!session?.user) throw new Error("Unauthorized");

      const userCart = await db
         .select({ id: cart.id, totalQuantity: cart.totalQuantity, totalPrice: cart.totalPrice })
         .from(cart)
         .where(eq(cart.user, session.user.id))
         .limit(1);

      if (userCart.length === 0) {
         return { success: true, data: { ...userCart[0], items: [] } };
      }

      const cartItems = await db
         .select({
            quantity: cartItem.quantity,
            product: {
               id: product.id,
               name: product.name,
               price: product.price,
               image: product.image
            }
         })
         .from(cartItem)
         .where(eq(cartItem.cartId, userCart[0].id))
         .leftJoin(product, eq(cartItem.product, product.id));

      return { success: true, data: { ...userCart[0], items: cartItems } };
   } catch (error) {
      console.error("Error getting cart items:", error);
      return { success: false, error: "Failed to get cart items" };
   }
}

export async function getCartDetails() {
   "use server";
   try {
      const session = await auth.api.getSession({ headers: await headers() });
      if (!session?.user) throw new Error("Unauthorized");

      const userCart = await db
         .select({ id: cart.id, totalQuantity: cart.totalQuantity, totalPrice: cart.totalPrice })
         .from(cart)
         .where(eq(cart.user, session.user.id))
         .limit(1);

      if (userCart.length === 0) {
         return { success: true, data: { ...userCart[0] } };
      }

      return { success: true, data: { ...userCart[0] } };
   } catch (error) {
      console.error("Error getting cart items:", error);
      return { success: false, error: "Failed to get cart items" };
   }
}

export async function getCartItems() {
   "use server";
   try {
      const session = await auth.api.getSession({ headers: await headers() });
      if (!session?.user) throw new Error("Unauthorized");

      const userCart = await db
         .select({ id: cart.id })
         .from(cart)
         .where(eq(cart.user, session.user.id))
         .limit(1);

      if (userCart.length === 0) {
         return { success: true, data: [] };
      }

      const cartItems = await db
         .select({
            quantity: cartItem.quantity,
            product: {
               id: product.id,
               name: product.name,
               price: product.price,
               image: product.image
            }
         })
         .from(cartItem)
         .where(eq(cartItem.cartId, userCart[0].id))
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

      const productData = await db
         .select({ stock: product.stock, price: product.price })
         .from(product)
         .where(eq(product.id, productId))
         .limit(1);
      if (productData.length === 0) {
         return { success: false, error: "Product not found" };
      }

      if (quantity < 0) {
         return { success: false, error: "Quantity cannot be negative" };
      }

      if (quantity > productData[0].stock) {
         return { success: false, error: "Quantity exceeds available stock" };
      }

      const userCart = await db
         .select({ id: cart.id, totalQuantity: cart.totalQuantity, totalPrice: cart.totalPrice })
         .from(cart)
         .where(eq(cart.user, session.user.id))
         .limit(1);
      if (userCart.length === 0) {
         return { success: false, error: "Cart not found" };
      }

      const currentItem = await db
         .select({ quantity: cartItem.quantity })
         .from(cartItem)
         .where(and(eq(cartItem.cartId, userCart[0].id), eq(cartItem.product, productId)))
         .limit(1);

      if (currentItem.length === 0) {
         return { success: false, error: "Cart item not found" };
      }

      await db
         .update(cartItem)
         .set({ quantity })
         .where(and(eq(cartItem.cartId, userCart[0].id), eq(cartItem.product, productId)));

      await updateCartTotals(userCart[0].id);

      revalidatePath("/cart");
      return { success: true, message: "Cart updated" };
   } catch (error) {
      console.error("Error updating cart:", error);
      return { success: false, error: "Failed to update cart" };
   }
}

export async function deleteCartItem(productId: string) {
   "use server";
   try {
      const session = await auth.api.getSession({ headers: await headers() });
      if (!session?.user) throw new Error("Unauthorized");

      const userCart = await db
         .select({ id: cart.id })
         .from(cart)
         .where(eq(cart.user, session.user.id))
         .limit(1);

      if (userCart.length === 0) {
         return { success: false, error: "Cart not found" };
      }

      await db
         .delete(cartItem)
         .where(and(eq(cartItem.cartId, userCart[0].id), eq(cartItem.product, productId)));

      await updateCartTotals(userCart[0].id);
      revalidatePath("/cart");
      return { success: true, message: "Cart item deleted" };
   } catch (error) {
      console.error("Error deleting cart item:", error);
      return { success: false, error: "Failed to delete cart item" };
   }
}

export async function clearCart() {
   "use server";
   try {
      const session = await auth.api.getSession({ headers: await headers() });
      if (!session?.user) throw new Error("Unauthorized");

      const userCart = await db
         .select({ id: cart.id })
         .from(cart)
         .where(eq(cart.user, session.user.id))
         .limit(1);

      if (userCart.length === 0) {
         return { success: false, error: "Cart not found" };
      }

      await db.delete(cartItem).where(eq(cartItem.cartId, userCart[0].id));
      await updateCartTotals(userCart[0].id);

      revalidatePath("/cart");
      return { success: true, message: "Cart cleared" };
   } catch (error) {
      console.error("Error clearing cart:", error);
      return { success: false, error: "Failed to clear cart" };
   }
}

async function updateCartTotals(cartId: string) {
   "use server";
   try {
      const cartItems = await db
         .select({ quantity: cartItem.quantity, price: product.price })
         .from(cartItem)
         .where(eq(cartItem.cartId, cartId))
         .leftJoin(product, eq(cartItem.product, product.id));

      const totals = cartItems.reduce(
         (acc, item) => {
            if (item.price) {
               acc.totalQuantity += item.quantity;
               acc.totalPrice += item.price * item.quantity;
            }
            return acc;
         },
         { totalQuantity: 0, totalPrice: 0 }
      );

      await db
         .update(cart)
         .set({
            totalQuantity: sql`${totals.totalQuantity}`,
            totalPrice: sql`${totals.totalPrice}`
         })
         .where(eq(cart.id, cartId));

      return { success: true };
   } catch (error) {
      console.error("Error updating cart totals:", error);
      return { success: false, error: "Failed to update cart totals" };
   }
}
