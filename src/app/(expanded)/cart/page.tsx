"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import EmptyCart from "@/icons/EmptyCart";
import {
   clearCart,
   getCartDetails,
   getCartItems,
   updateCartItemQuantity
} from "@/actions/checkout";
import { ArrowLeft, ArrowRight, Minus, Plus, Trash } from "lucide-react";

interface Product {
   id: string;
   name: string;
   price: number;
   image: string | null;
}

interface CartItem {
   user: string;
   quantity: number;
   createdAt: Date;
   updatedAt: Date;
   product: Product | null;
}

export default function CartPage() {
   const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
   const [cartDetails, setCartDetails] = React.useState<{
      count: number;
      totalPrice: number;
   } | null>(null);

   const handleClearCart = async () => {
      const { success } = await clearCart();
      if (success) setToggle((prev) => !prev);
   };

   const [toggle, setToggle] = React.useState(false);

   React.useEffect(() => {
      const fetchCartItems = async () => {
         const { success, data } = await getCartItems();
         if (success && data) setCartItems(data);
      };

      const fetchCartDetails = async () => {
         const { success, data } = await getCartDetails();
         if (success && data) setCartDetails(data);
      };

      fetchCartItems();
      fetchCartDetails();
   }, [toggle]);

   const handleQuantityChange = async (productId: string, quantity: number) => {
      await updateCartItemQuantity(productId, quantity);
      setToggle((prev) => !prev);
   };

   return (
      <section className="col-span-1 col-start-2 flex h-full flex-col space-y-6 overflow-hidden rounded-lg bg-white px-10 py-6 pt-20">
         <main className="mx-auto w-full max-w-6xl">
            <header className="flex items-center justify-between pb-2">
               <h1 className="text-foreground text-2xl font-bold">Shopping Cart</h1>
               <div className="flex items-center gap-4">
                  <p className="space-x-1.5">
                     <span className="text-foreground font-semibold">
                        {cartDetails?.count || 0}
                     </span>
                     <span>items</span>
                  </p>
                  <div className="h-8 w-[1px] bg-gray-200"></div>
                  <button
                     onClick={handleClearCart}
                     className="hover:text-primary transition-colors"
                  >
                     Clear All
                  </button>
               </div>
            </header>

            {cartItems.length > 0 ? (
               <main className="mt-12">
                  <section className="text-sm">
                     <header className="grid grid-cols-[2fr_1fr_1fr_1fr_5rem] border-b border-gray-100 pb-3 uppercase">
                        <div>Product</div>
                        <div className="text-center">Quantity</div>
                        <div className="text-center">Price</div>
                        <div className="text-center">Total</div>
                        <div className="text-center">Action</div>
                     </header>

                     <main>
                        {cartItems.map((item) => (
                           <div
                              key={item.product?.id}
                              className="grid grid-cols-[2fr_1fr_1fr_1fr_5rem] border-b border-gray-100 py-3 pb-6"
                           >
                              <div className="flex items-center gap-x-6">
                                 <Link href={`/products/${item.product?.id}/details`}>
                                    <Image
                                       width={64}
                                       height={64}
                                       src={item.product?.image as string}
                                       alt={item.product?.name || "Product"}
                                       className="size-16 rounded-md object-cover object-top"
                                    />
                                 </Link>
                                 <div className="space-y-0.5">
                                    <Link
                                       href={`/products/${item.product?.id}/details`}
                                       className="text-foreground font-semibold"
                                    >
                                       {item.product?.name}
                                    </Link>
                                 </div>
                              </div>
                              <div className="flex-center">
                                 <div className="flex-center gap-x-2">
                                    <button
                                       onClick={() =>
                                          handleQuantityChange(
                                             item.product?.id || "",
                                             item.quantity - 1
                                          )
                                       }
                                       className="flex-center size-9 rounded-full bg-gray-100 transition-all hover:bg-gray-200 active:scale-90"
                                    >
                                       <Minus className="size-4" />
                                    </button>
                                    <input
                                       type="number"
                                       readOnly
                                       value={item.quantity}
                                       className="input number-input w-16 rounded-lg text-center"
                                    />
                                    <button
                                       onClick={() =>
                                          handleQuantityChange(
                                             item.product?.id || "",
                                             item.quantity + 1
                                          )
                                       }
                                       className="flex-center size-9 rounded-full bg-gray-100 transition-all hover:bg-gray-200 active:scale-90"
                                    >
                                       <Plus className="size-4" />
                                    </button>
                                 </div>
                              </div>
                              <div className="flex-center text-foreground">
                                 {item.product?.price} Tk.
                              </div>
                              <div className="flex-center text-foreground">
                                 {(item.product?.price || 0) * item.quantity} Tk.
                              </div>
                              <div className="flex-center">
                                 <button className="flex-center size-10 rounded-full bg-gray-100 transition-all hover:bg-gray-200 active:scale-90">
                                    <Trash className="size-4" />
                                 </button>
                              </div>
                           </div>
                        ))}
                     </main>
                  </section>

                  <div className="mt-6 flex justify-between">
                     <Link
                        href="/products"
                        className="text-muted-foreground flex items-center gap-x-2 rounded-xl border px-4 py-3"
                     >
                        <ArrowLeft className="size-5" />
                        <span>Continue Shopping</span>
                     </Link>
                     <div className="flex items-center gap-x-6">
                        <p className="space-x-1.5">
                           <span>Total:</span>
                           <span className="text-foreground font-semibold">
                              {cartDetails?.totalPrice || 0} Tk.
                           </span>
                        </p>

                        <Link
                           href="/checkout"
                           className="bg-primary flex items-center gap-x-2 rounded-xl border px-4 py-3 text-white"
                        >
                           <span>Checkout</span>
                           <ArrowRight className="size-5" />
                        </Link>
                     </div>
                  </div>
               </main>
            ) : (
               <div className="flex-center flex-1 flex-col">
                  <EmptyCart className="mx-auto w-full max-w-md" />
                  <p className="text-foreground text-center text-2xl leading-relaxed font-semibold tracking-tight">
                     Your cart is looking a bit lonely
                     <span className="text-muted-foreground mt-1 block text-lg font-normal">
                        Add some items to make it happy!
                     </span>
                  </p>
               </div>
            )}
         </main>
      </section>
   );
}
