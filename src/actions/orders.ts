"use server";

import { db } from "@/db";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { cart, cartItem } from "@/db/schema/cart";
import { revalidatePath } from "next/cache";
import { product } from "@/db/schema/product";
import { order, orderItem } from "@/db/schema/checkout";
import { CheckoutFormValues } from "@/lib/validation/checkout";

export async function createOrder(data: CheckoutFormValues) {
   "use server";
   try {
      const session = await auth.api.getSession({ headers: await headers() });
      if (!session?.user) throw new Error("Unauthorized");

      const userCart = await db
         .select({ id: cart.id, totalQuantity: cart.totalQuantity, totalPrice: cart.totalPrice })
         .from(cart)
         .where(eq(cart.user, session.user.id))
         .limit(1);

      // Create the order
      const [newOrder] = await db
         .insert(order)
         .values({
            user: session.user.id,
            shippingName: data.shipping_name,
            shippingContact: data.shipping_phone,
            shippingAddress: data.shipping_address,
            shippingZone: data.shipping_zone,
            shippingArea: data.shipping_area,
            billingName: data.billing_name,
            billingContact: data.billing_phone,
            billingAddress: data.billing_address,
            billingZone: data.billing_zone,
            billingArea: data.billing_area,
            shippingMethod: data.delivery_method,
            totalPrice: userCart[0].totalPrice
         })
         .returning();

      if (!newOrder) throw new Error("Failed to create order");

      // Create order items
      const cartItems = await db
         .select({
            product: product.id,
            productName: product.name,
            productPrice: product.price,
            productImage: product.image,
            quantity: cartItem.quantity
         })
         .from(cartItem)
         .where(eq(cartItem.cartId, userCart[0].id))
         .leftJoin(product, eq(cartItem.product, product.id));

      await db.insert(orderItem).values(
         cartItems.map((item) => ({
            order: newOrder.id,
            product: item.product,
            productName: item.productName ?? "",
            productPrice: String(item.productPrice ?? 0.0),
            productImage: item.productImage ?? "",
            quantity: item.quantity,
            totalPrice: String((item.productPrice ?? 0) * item.quantity)
         }))
      );

      // delete the cart
      await db.delete(cart).where(eq(cart.user, session.user.id));

      revalidatePath("/orders");
      return { success: true, data: newOrder };
   } catch (error) {
      console.error("Error creating order:", error);
      return { success: false, error: "Failed to create order" };
   }
}

export async function getOrders() {
   "use server";
   try {
      const session = await auth.api.getSession({ headers: await headers() });
      if (!session?.user) throw new Error("Unauthorized");

      const orders = await db
         .select()
         .from(order)
         .where(eq(order.user, session.user.id))
         .orderBy(order.orderedAt);

      const ordersWithItems = await Promise.all(
         orders.map(async (order) => {
            const items = await db.select().from(orderItem).where(eq(orderItem.order, order.id));
            const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
            return { ...order, totalItems, items };
         })
      );

      return { success: true, data: ordersWithItems };
   } catch (error) {
      console.error("Error getting orders:", error);
      return { success: false, error: "Failed to get orders" };
   }
}

export async function getOrderDetails(orderId: string) {
   "use server";
   try {
      const session = await auth.api.getSession({ headers: await headers() });
      if (!session?.user) throw new Error("Unauthorized");

      const orderDetails = await db.select().from(order).where(eq(order.id, orderId)).limit(1);

      if (orderDetails.length === 0) {
         return { success: false, error: "Order not found" };
      }

      const items = await db
         .select({
            quantity: orderItem.quantity,
            product: {
               id: product.id,
               name: product.name,
               price: product.price,
               image: product.image
            }
         })
         .from(orderItem)
         .where(eq(orderItem.order, orderId))
         .leftJoin(product, eq(orderItem.product, product.id));

      return { success: true, data: { ...orderDetails[0], items } };
   } catch (error) {
      console.error("Error getting order details:", error);
      return { success: false, error: "Failed to get order details" };
   }
}
