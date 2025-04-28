"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/form";
import { zones } from "@/lib/data/zones";

function CheckoutPage() {
   return (
      <div className="container mx-auto px-4 py-8">
         <h1 className="mb-8 text-3xl font-bold">Checkout</h1>
         <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left Column - Form */}
            <div className="lg:col-span-2">
               <div className="mb-6 rounded-lg bg-white p-6 shadow">
                  <h2 className="mb-8 text-xl font-semibold">Shipping Details</h2>

                  <div className="space-y-6">
                     <div className="flex gap-5">
                        <Input label="Name" placeholder="Name" type="text" />
                        <Input label="Phone Number" placeholder="Phone Number" type="tel" />
                     </div>
                     <Input label="Address" />
                     <div className="grid grid-cols-2 gap-5">
                        <div className="flex-1 space-y-2.5">
                           <Label htmlFor="zone">Zone</Label>
                           <select
                              id="zone"
                              className="focus:border-primary focus:ring-primary/50 h-11 w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:outline-none"
                           >
                              {zones.map((zone) => (
                                 <option key={zone.value} value={zone.value}>
                                    {zone.label}
                                 </option>
                              ))}
                           </select>
                        </div>
                        <Input label="Area" placeholder="Area" type="text" />
                     </div>
                  </div>
               </div>

               <div className="mb-6 rounded-lg bg-white p-6 shadow">
                  <h2 className="mb-8 text-xl font-semibold">Billing Details</h2>

                  <div className="space-y-6">
                     <div className="flex gap-5">
                        <Input label="Name" placeholder="Name" type="text" />
                        <Input label="Phone Number" placeholder="Phone Number" type="tel" />
                     </div>
                     <Input label="Address" />
                     <div className="grid grid-cols-2 gap-5">
                        <div className="flex-1 space-y-2.5">
                           <Label htmlFor="zone">Zone</Label>
                           <select
                              id="zone"
                              className="focus:border-primary focus:ring-primary/50 h-11 w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:outline-none"
                           >
                              {zones.map((zone) => (
                                 <option key={zone.value} value={zone.value}>
                                    {zone.label}
                                 </option>
                              ))}
                           </select>
                        </div>
                        <Input label="Area" placeholder="Area" type="text" />
                     </div>
                  </div>
               </div>

               <div className="rounded-lg bg-white p-6 shadow">
                  <h2 className="mb-4 text-xl font-semibold">Payment Method</h2>
                  <RadioGroup defaultValue="cash" name="paymentMethod">
                     <div className="flex items-center space-x-2">
                        <RadioGroupItem value="cash" id="cash" />
                        <Label htmlFor="cash">Cash on Delivery</Label>
                     </div>
                     <div className="flex items-center space-x-2">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card">Credit/Debit Card</Label>
                     </div>
                     <div className="flex items-center space-x-2">
                        <RadioGroupItem value="bKash" id="bKash" />
                        <Label htmlFor="bKash">bKash</Label>
                     </div>
                  </RadioGroup>
               </div>
            </div>

            {/* Right Column - Summary */}
            <div className="rounded-lg bg-white p-6 shadow">
               <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
               <div className="space-y-4">
                  <div className="flex justify-between">
                     <span>Subtotal</span>
                     <span>৳ 1,500</span>
                  </div>
                  <div className="flex justify-between">
                     <span>Shipping</span>
                     <span>৳ 100</span>
                  </div>
                  <div className="flex justify-between font-bold">
                     <span>Total</span>
                     <span>৳ 1,600</span>
                  </div>
               </div>
               <Button type="submit" className="mt-6 w-full">
                  Place Order
               </Button>
            </div>
         </div>
      </div>
   );
}

export default CheckoutPage;
