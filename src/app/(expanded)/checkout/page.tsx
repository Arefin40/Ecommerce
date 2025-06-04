"use client";

import {
   CheckoutFormValues,
   checkoutSchema,
   defaultCheckoutValues
} from "@/lib/validation/checkout";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getAllAreas } from "@/actions/address";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createOptions } from "@/lib/utils";
import { getCartDetails } from "@/actions/cart";
import { createOrder } from "@/actions/orders";
import { useSession } from "@/context/session";
import CheckoutForm from "./CheckoutForm";
import PaymentSystem from "@/components/PaymentSystem";

interface CartDetails {
   id: string;
   totalQuantity: number;
   totalPrice: string;
}

function CheckoutContent() {
   const router = useRouter();
   const [areas, setAreas] = useState<Area[]>([]);
   const [cartDetails, setCartDetails] = useState<CartDetails>();
   const [shippingAreas, setShippingAreas] = useState<Option[]>([]);
   const [billingAreas, setBillingAreas] = useState<Option[]>([]);
   const [paymentMethod, setPaymentMethod] = useState<"ONLINE" | "COD">("ONLINE");
   const [orderId, setOrderId] = useState<string>();
   const [selectedGateway, setSelectedGateway] = useState<string>();

   const {
      register,
      handleSubmit,
      setValue,
      watch,
      formState: { errors }
   } = useForm<CheckoutFormValues>({
      resolver: zodResolver(checkoutSchema),
      defaultValues: defaultCheckoutValues
   });

   useEffect(() => {
      const fetchData = async () => {
         const [areasData, cartData] = await Promise.all([getAllAreas(), getCartDetails()]);
         const areaOptions = createOptions(areasData);
         setAreas(areasData);
         if (cartData?.data) setCartDetails(cartData.data);
         setShippingAreas(areaOptions);
         setBillingAreas(areaOptions);
      };
      fetchData();
   }, []);

   const setZone = (name: "shipping_zone" | "billing_zone", zone: Option) => {
      setValue(name, zone.label);
      const filtered_areas = areas.filter((area) => String(area.zone) === zone.value);
      const areaOptions = createOptions(filtered_areas);
      if (name === "shipping_zone") setShippingAreas(areaOptions);
      else if (name === "billing_zone") setBillingAreas(areaOptions);
   };

   const deliveryCharge = watch("delivery_method") === "EXPRESS" ? 200 : 100;
   const shouldShowPaymentSystem = paymentMethod === "ONLINE" && orderId;

   const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setPaymentMethod(value as "ONLINE" | "COD");
   };

   const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (orderId && paymentMethod === "ONLINE" && selectedGateway) {
         e.preventDefault();
         router.push(selectedGateway);
      }
   };

   const onSubmit = async (data: CheckoutFormValues) => {
      const { data: order } = await createOrder(data);
      if (order) {
         setOrderId(order.id);
         if (paymentMethod === "COD") router.push(`/orders/placed?id=${order.id}`);
      }
   };

   return (
      <form
         data-testid="checkout-form"
         onSubmit={handleSubmit(onSubmit)}
         className="w-full bg-white"
      >
         <section className="mx-auto grid size-full h-screen max-w-6xl grid-cols-[1fr_24rem] gap-4 overflow-hidden bg-white">
            <main className="scroll-hide flex h-screen flex-col gap-y-4 overflow-y-auto p-6 pt-20">
               {shouldShowPaymentSystem ? (
                  <PaymentSystem
                     orderId={orderId}
                     onSelect={(gatewayUrl) => setSelectedGateway(gatewayUrl)}
                     selectedGateway={selectedGateway}
                  />
               ) : (
                  <CheckoutForm
                     register={register}
                     setValue={setValue}
                     setZone={setZone}
                     errors={errors}
                     shippingAreas={shippingAreas}
                     billingAreas={billingAreas}
                  />
               )}
            </main>

            <aside className="sticky top-20 flex h-screen flex-col pt-20 pb-4">
               <div className="border-border flex-1 rounded-lg border bg-white p-6">
                  <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
                  <div className="space-y-4">
                     <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>৳ {Number(cartDetails?.totalPrice || 0) * 1.05}</span>
                     </div>

                     <div className="space-y-4">
                        <h3 className="font-semibold">Shipping Method</h3>
                        <div className="space-y-2">
                           <label htmlFor="standard" className="block cursor-pointer">
                              <div className="has-[:checked]:border-primary has-[:checked]:bg-primary/10 flex items-center gap-2 rounded-lg border p-3">
                                 <input
                                    type="radio"
                                    id="standard"
                                    value="STANDARD"
                                    {...register("delivery_method")}
                                    className="hidden"
                                 />
                                 <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                       <p className="font-medium">Standard Shipping</p>
                                       <span>৳ 100</span>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                       Est. delivery: 3-5 business days
                                    </p>
                                 </div>
                              </div>
                           </label>
                           <label htmlFor="express" className="block cursor-pointer">
                              <div className="has-[:checked]:border-primary has-[:checked]:bg-primary/10 flex items-center gap-2 rounded-lg border p-3">
                                 <input
                                    type="radio"
                                    id="express"
                                    value="EXPRESS"
                                    {...register("delivery_method")}
                                    className="hidden"
                                 />
                                 <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                       <p className="font-medium">Express Shipping</p>
                                       <span>৳ 200</span>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                       Est. delivery: 1-2 business days
                                    </p>
                                 </div>
                              </div>
                           </label>
                        </div>
                     </div>

                     <div className="space-y-4">
                        <h3 className="font-semibold">Payment Method</h3>
                        <div className="space-y-2">
                           <label htmlFor="online" className="block cursor-pointer">
                              <div className="has-[:checked]:border-primary has-[:checked]:bg-primary/10 flex items-center gap-2 rounded-lg border p-3">
                                 <input
                                    type="radio"
                                    id="online"
                                    value="ONLINE"
                                    checked={paymentMethod === "ONLINE"}
                                    onChange={handlePaymentMethodChange}
                                 />
                                 <span>Bank / MFS / Card</span>
                              </div>
                           </label>
                           <label htmlFor="cash" className="block cursor-pointer">
                              <div className="has-[:checked]:border-primary has-[:checked]:bg-primary/10 flex items-center gap-2 rounded-lg border p-3">
                                 <input
                                    type="radio"
                                    id="cash"
                                    value="COD"
                                    checked={paymentMethod === "COD"}
                                    onChange={handlePaymentMethodChange}
                                 />
                                 <span>Cash On Delivery</span>
                              </div>
                           </label>
                        </div>
                     </div>

                     <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>
                           ৳{" "}
                           {(
                              parseFloat(String(cartDetails?.totalPrice || 0)) * 1.05 +
                              deliveryCharge
                           ).toFixed(2)}
                        </span>
                     </div>
                  </div>
                  <Button
                     data-testid="place-order-button"
                     type={orderId ? "button" : "submit"}
                     onClick={handleOnClick}
                     className="mt-6 w-full font-semibold"
                  >
                     {orderId && paymentMethod === "ONLINE" ? "Pay Now" : "Place Order"}
                  </Button>
               </div>
            </aside>
         </section>
      </form>
   );
}

function CheckoutPage() {
   const router = useRouter();
   const { user, isPending } = useSession();

   if (isPending) return null;
   if (!user) {
      router.push("/login");
      return null;
   }

   return <CheckoutContent />;
}

export default CheckoutPage;
