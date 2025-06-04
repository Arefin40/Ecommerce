"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import EmptyCart from "@/icons/EmptyCart";
import { Input } from "@/components/ui/form";
import { useCartItems, useClearCart, useDeleteCartItem, useUpdateCart } from "@/hooks/cart";
import { ArrowLeft, ArrowRight, Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CartPage() {
   const { data: cartData, isLoading } = useCartItems();
   const { mutate: updateQuantity } = useUpdateCart();
   const { mutate: clearCart } = useClearCart();
   const { mutate: deleteCartItem } = useDeleteCartItem();

   const handleQuantityChange = async (productId: string, quantity: number) => {
      await updateQuantity({ productId, quantity });
   };

   const handleDeleteCartItem = async (productId: string | undefined) => {
      if (!productId) return;
      await deleteCartItem(productId);
   };

   console.log(cartData);
   if (isLoading) return <CartIsLoading />;
   else if (!cartData?.items || !cartData?.items.length) return <EmptyState />;

   return (
      <main className="h-screen overflow-hidden bg-gray-100 pt-20 pb-6">
         <section className="box-container scroll-hide grid size-full gap-4 overflow-hidden overflow-y-auto xl:grid-cols-[1fr_20rem] xl:overflow-y-hidden">
            <section className="flex flex-col space-y-10 rounded-xl bg-white p-6 xl:overflow-hidden">
               <header className="flex items-center justify-between pb-2">
                  <h1 className="text-foreground text-2xl font-bold">Shopping Cart</h1>
                  <div className="flex items-center gap-4">
                     <p className="space-x-1.5">
                        <span className="text-foreground font-semibold">
                           {cartData.details?.totalQuantity || 0}
                        </span>
                        <span>items</span>
                     </p>
                     <div className="h-8 w-[1px] bg-gray-200"></div>
                     <button
                        onClick={() => clearCart()}
                        className="hover:text-primary transition-colors"
                     >
                        Clear All
                     </button>
                  </div>
               </header>

               <section className="flex flex-1 flex-col xl:overflow-hidden xl:overflow-y-auto">
                  <header className="grid grid-cols-[2fr_1fr_1fr_1fr_5rem] border-b border-gray-100 pb-3 uppercase">
                     <div>Product</div>
                     <div className="text-center">Quantity</div>
                     <div className="text-center">Price</div>
                     <div className="text-center">Total</div>
                     <div className="text-center">Action</div>
                  </header>

                  <main
                     data-testid="cart-items"
                     className="scroll-hide flex-1 overflow-hidden overflow-y-auto"
                  >
                     {cartData.items.map((item) => (
                        <div
                           key={item.product?.id}
                           className="grid grid-cols-[2fr_1fr_1fr_1fr_5rem] border-b border-gray-100 py-3 pb-6"
                        >
                           <div className="flex items-center gap-x-6">
                              <Link
                                 href={`/products/${item.product?.id}/details`}
                                 className="shrink-0"
                              >
                                 <Image
                                    priority
                                    width={64}
                                    height={64}
                                    src={item.product?.image as string}
                                    alt={item.product?.name || "Product"}
                                    className="size-16 shrink-0 rounded-md object-cover object-top"
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
                                       item.quantity > 1 &&
                                       handleQuantityChange(
                                          item.product?.id || "",
                                          item.quantity - 1
                                       )
                                    }
                                    className="flex-center size-9 rounded-full bg-gray-100 transition-all hover:bg-gray-200 active:scale-90"
                                 >
                                    <Minus className="size-4" />
                                 </button>
                                 <Input
                                    readOnly
                                    value={item.quantity}
                                    baseClassName="w-16 text-center appearance-none"
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
                              <button
                                 onClick={() => handleDeleteCartItem(item.product?.id)}
                                 className="flex-center group size-10 rounded-full bg-gray-100 transition-all hover:bg-gray-200 active:scale-90"
                              >
                                 <Trash2 className="text-muted-foreground size-4 group-hover:text-black" />
                              </button>
                           </div>
                        </div>
                     ))}
                  </main>
               </section>

               <footer className="mt-full flex justify-between">
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
                           {cartData.details?.totalPrice || 0} Tk.
                        </span>
                     </p>

                     <Link
                        href="/checkout"
                        data-testid="checkout-button"
                        className="bg-primary flex items-center gap-x-2 rounded-xl border px-4 py-3 text-white"
                     >
                        <span>Checkout</span>
                        <ArrowRight className="size-5" />
                     </Link>
                  </div>
               </footer>
            </section>

            <aside className="flex w-full flex-col items-start">
               <section className="w-full space-y-6 rounded-xl bg-white px-5 py-6">
                  <h2 className="font-bold">Order Summary</h2>

                  <div className="flex gap-2">
                     <Input placeholder="Coupon Code" baseClassName="h-10" />
                     <Button className="h-10">Apply</Button>
                  </div>

                  <div className="flex w-full flex-col gap-y-2 pt-4 text-sm">
                     <p className="flex justify-between">
                        <span className="text-gray-700">Sub Total</span>
                        <span className="font-semibold">
                           {cartData.details?.totalPrice || 0} BDT
                        </span>
                     </p>
                     <p className="flex justify-between">
                        <span>
                           <span className="text-gray-700">Tax</span>
                           <span className="text-muted-foreground ml-1">/ 5%</span>
                        </span>
                        <span className="font-semibold">
                           {(cartData.details?.totalPrice || 0) * 0.05} BDT
                        </span>
                     </p>
                     <p className="flex justify-between">
                        <span>
                           <span className="text-gray-700">Shipping</span>
                           <span className="text-muted-foreground ml-1">/ STANDARD</span>
                        </span>
                        <span className="font-semibold">{100} BDT</span>
                     </p>
                     <p className="mt-2 flex justify-between border-t pt-4">
                        <span className="font-semibold">Grand Total</span>
                        <span className="font-semibold">
                           {(cartData.details?.totalPrice || 0) * 1.05 + 100} BDT
                        </span>
                     </p>
                  </div>
               </section>
            </aside>
         </section>
      </main>
   );
}

function EmptyState() {
   return (
      <section className="flex-center h-full pt-20">
         <div className="flex-center flex-1 flex-col">
            <EmptyCart className="mx-auto w-full max-w-md" />
            <p className="text-foreground text-center text-2xl leading-relaxed font-semibold tracking-tight">
               Your cart is looking a bit lonely
               <span className="text-muted-foreground mt-1 block text-lg font-normal">
                  Add some items to make it happy!
               </span>
            </p>
         </div>
      </section>
   );
}

function CartIsLoading() {
   return (
      <main className="h-screen overflow-hidden bg-gray-100 pt-20 pb-6">
         <section className="box-container grid size-full grid-cols-[1fr_18rem] gap-4">
            <section className="h-full rounded-xl bg-white p-6">
               <div className="flex h-full animate-pulse flex-col justify-between gap-y-6">
                  <div className="flex items-center justify-between">
                     <div className="h-8 w-48 rounded bg-gray-200"></div>
                     <div className="flex items-center gap-4">
                        <div className="h-6 w-24 rounded bg-gray-200"></div>
                        <div className="h-8 w-px bg-gray-200"></div>
                        <div className="h-6 w-16 rounded bg-gray-200"></div>
                     </div>
                  </div>

                  <div className="space-y-4">
                     <div className="grid grid-cols-[2fr_1fr_1fr_1fr_5rem] gap-4 border-b border-gray-200 pb-3">
                        {[...Array(5)].map((_, i) => (
                           <div key={i} className="h-6 rounded bg-gray-200"></div>
                        ))}
                     </div>

                     {[...Array(3)].map((_, i) => (
                        <div
                           key={i}
                           className="grid grid-cols-[2fr_1fr_1fr_1fr_5rem] gap-4 border-b border-gray-200 py-3 pb-6"
                        >
                           <div className="flex items-center gap-x-6">
                              <div className="size-16 rounded-md bg-gray-200"></div>
                              <div className="h-4 w-32 rounded bg-gray-200"></div>
                           </div>
                           <div className="flex items-center justify-center">
                              <div className="h-10 w-32 rounded bg-gray-200"></div>
                           </div>
                           <div className="flex items-center justify-center">
                              <div className="h-4 w-16 rounded bg-gray-200"></div>
                           </div>
                           <div className="flex items-center justify-center">
                              <div className="h-4 w-16 rounded bg-gray-200"></div>
                           </div>
                           <div className="flex items-center justify-center">
                              <div className="size-10 rounded-full bg-gray-200"></div>
                           </div>
                        </div>
                     ))}
                  </div>

                  <div className="mt-auto flex justify-between">
                     <div className="h-12 w-40 rounded-xl bg-gray-200"></div>
                     <div className="h-12 w-32 rounded-xl bg-gray-200"></div>
                  </div>
               </div>
            </section>

            <aside className="rounded-xl bg-white p-6">
               <div className="flex h-full animate-pulse flex-col gap-y-6">
                  <div className="h-8 w-32 rounded bg-gray-200"></div>
                  <div className="flex gap-2">
                     <div className="h-10 flex-1 rounded bg-gray-200"></div>
                     <div className="h-10 w-20 rounded bg-gray-200"></div>
                  </div>
                  <div className="flex flex-col gap-y-2 pt-4">
                     {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex justify-between">
                           <div className="h-4 w-24 rounded bg-gray-200"></div>
                           <div className="h-4 w-16 rounded bg-gray-200"></div>
                        </div>
                     ))}
                  </div>
               </div>
            </aside>
         </section>
      </main>
   );
}
