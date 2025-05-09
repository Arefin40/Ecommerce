import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function OrderPlacedPage() {
   return (
      <section className="flex justify-center bg-gray-50 pt-20">
         <div className="flex w-full flex-col items-center border py-8">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
               <CheckCircle className="h-12 w-12 text-green-600" />
            </div>

            <div className="text-center">
               <h1 className="mb-4 text-3xl font-bold text-gray-900">Thank you for your order!</h1>
               <div className="flex flex-col text-gray-600">
                  <p>Your order has been placed successfully!</p>
                  <p className="mt-2">
                     We&apos;re processing it now and will notify you once it ships.
                  </p>
               </div>
            </div>

            <div className="mt-8 w-full max-w-lg">
               <div className="overflow-hidden rounded-lg border">
                  <div className="border-b bg-gray-50 px-4 py-3">
                     <h3 className="font-semibold text-gray-900">Order Summary</h3>
                  </div>

                  <div className="space-y-4 p-4">
                     <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-x-4">
                           <div className="h-12 w-12 rounded-md bg-gray-200"></div>
                           <div>
                              <h4 className="font-medium text-gray-900">Product Name</h4>
                              <p className="text-gray-500">Qty: 1</p>
                           </div>
                        </div>
                        <span className="font-medium text-gray-900">৳ 1,500</span>
                     </div>

                     <div className="space-y-2 border-t pt-4">
                        <div className="flex justify-between text-sm">
                           <span className="text-gray-500">Subtotal</span>
                           <span className="font-medium text-gray-900">৳ 1,500</span>
                        </div>
                        <div className="flex justify-between text-sm">
                           <span className="text-gray-500">Shipping (Standard)</span>
                           <span className="font-medium text-gray-900">৳ 100</span>
                        </div>
                        <div className="flex justify-between border-t pt-2 text-sm font-medium">
                           <span>Total</span>
                           <span>৳ 1,600</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="mt-8 w-full max-w-sm space-y-4">
               <Button asChild variant="outline" className="w-full">
                  <Link href="/">Continue Shopping</Link>
               </Button>
               <Button asChild className="w-full">
                  <Link href="/orders">View Order Details</Link>
               </Button>
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
               <p>
                  Contact us anytime at{" "}
                  <a href="mailto:support@example.com" className="text-blue-600 hover:underline">
                     support@example.com
                  </a>
               </p>
               <p>
                  or{" "}
                  <a href="tel:+8801234567890" className="text-gray-900 hover:underline">
                     +8801234-567890
                  </a>
               </p>
            </div>
         </div>
      </section>
   );
}
