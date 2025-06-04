import Link from "next/link";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { cn, formatDate } from "@/lib/utils";
import { redirect } from "next/navigation";
import { getOrders } from "@/actions/orders";
import { Button } from "@/components/ui/button";
import { Check, Package, ShoppingBag } from "lucide-react";
import PaymentLink from "./PaymentLink";

const orderStages = [
   { status: "pending", label: "Order Placed" },
   { status: "confirmed", label: "Confirmed" },
   { status: "processing", label: "Processing" },
   { status: "shipped", label: "Shipped" },
   { status: "out_for_delivery", label: "Out for Delivery" },
   { status: "delivered", label: "Delivered" }
];

export default async function OrdersPage() {
   const session = await auth.api.getSession({ headers: await headers() });
   if (!session?.user) return redirect("/login");

   const { data: orders } = await getOrders();

   if (!orders || orders.length < 1) {
      return (
         <div className="flex-center h-screen flex-col space-y-4 py-16">
            <Package className="text-muted-foreground size-16" />
            <h2 className="text-2xl font-medium">No orders yet</h2>
            <p className="text-muted-foreground">Your order history will appear here</p>
            <Button asChild className="gap-2">
               <Link href="/products">
                  <ShoppingBag className="size-4" />
                  Start Shopping
               </Link>
            </Button>
         </div>
      );
   }

   return (
      <main className="h-full overflow-y-auto bg-white">
         <div className="box-container grid h-full gap-x-4 xl:grid-cols-[1fr_24rem]">
            <div className="px-4 py-8 pt-24">
               <header className="h-16 space-y-1">
                  <div className="flex items-center gap-x-2">
                     <p className="text-xl font-bold">Your Orders</p>
                     <span className="bg-gray-100text-gray-700 bg-muted text-muted-foreground text flex-center aspect-square rounded-md px-2 py-0.5 leading-none">
                        {orders.length}
                     </span>
                  </div>
               </header>

               <div className="space-y-4">
                  {orders.map((order) => (
                     <div
                        key={order.id}
                        className="border-border overflow-hidden rounded-lg border"
                     >
                        <div className="bg-card flex flex-col gap-y-4 p-6">
                           <header className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                 <div className="bg-muted flex size-12 items-center justify-center rounded-full">
                                    <Package className="text-muted-foreground size-5" />
                                 </div>
                                 <div>
                                    <h3 className="flex gap-2 text-base font-medium">
                                       <span className="text-muted-foreground">Order</span>
                                       <span className="text-foreground uppercase">
                                          #{order.id.slice(0, 8)}
                                       </span>
                                    </h3>
                                    <p className="text-muted-foreground text-sm">
                                       {formatDate(order.createdAt)}
                                    </p>
                                 </div>
                              </div>
                              <Button variant="outline" size="sm" className="text-sm">
                                 View Details
                              </Button>
                           </header>

                           <div className="border-border border-b border-dashed" />

                           <div className="flex gap-4 pt-2">
                              <div className="flex-1 space-y-1">
                                 <p className="text-muted-foreground text-sm">Total</p>
                                 <p className="font-medium">
                                    $
                                    {parseFloat(order.totalPrice) +
                                       (order.shippingMethod === "EXPRESS" ? 200 : 100)}
                                 </p>
                              </div>
                              <div className="flex-1 space-y-1">
                                 <p className="text-muted-foreground text-sm">Ship To</p>
                                 <p className="font-medium">{order.shippingName}</p>
                              </div>
                              <div className="flex-1 space-y-1">
                                 <p className="text-muted-foreground text-sm">Order Status</p>
                                 <p className="font-medium">
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                 </p>
                              </div>
                              <div className="flex-1 space-y-1">
                                 <p className="text-muted-foreground text-sm">Payment Status</p>
                                 {order.isPaid ? (
                                    <div className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600">
                                       Paid
                                    </div>
                                 ) : (
                                    <div className="flex items-center gap-2">
                                       <div className="text-destructive inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-xs font-medium">
                                          Not Paid
                                       </div>
                                       <div className="flex flex-1 items-center gap-x-2">
                                          <span className="size-0.75 shrink-0 rounded-full bg-gray-500"></span>
                                          <PaymentLink orderId={order.id} />
                                       </div>
                                    </div>
                                 )}
                              </div>
                           </div>

                           <div className="mt-4 flex-1 space-y-2">
                              <p className="text-muted-foreground text-sm">Order Items</p>
                              <div className="flex items-center gap-4">
                                 {order.items.map((p) => (
                                    <div
                                       key={p.product}
                                       className="border-border relative aspect-square size-20 rounded-md"
                                    >
                                       <Image
                                          fill
                                          priority
                                          src={p.productImage}
                                          alt={p.productName}
                                          className="aspect-square size-full rounded-md object-cover object-center"
                                          sizes="5rem"
                                       />
                                    </div>
                                 ))}
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            <aside className="sticky top-24 hidden h-full w-80 pt-40 xl:block">
               <div className="rounded-xl border bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-lg font-semibold">Order Status</h3>
                  <div className="relative">
                     {orders.length > 0 &&
                        orderStages.map((stage, index, array) => {
                           const isActive =
                              orders[0].status === stage.status && orders[0].status !== "delivered";
                           const isCompleted =
                              array.findIndex((s) => s.status === orders[0].status) > index ||
                              orders[0].status === "delivered";

                           return (
                              <div key={stage.status} className="relative flex pb-7 text-sm">
                                 <div
                                    className={cn(
                                       "relative z-10 flex size-6 items-center justify-center rounded-full",
                                       {
                                          "bg-primary text-white": isActive,
                                          "bg-green-500 text-white": isCompleted,
                                          "bg-gray-200 text-gray-600": !isActive && !isCompleted
                                       }
                                    )}
                                 >
                                    {isCompleted ? (
                                       <Check size={16} strokeWidth={2} />
                                    ) : (
                                       <span className="text-xs font-medium">{index + 1}</span>
                                    )}
                                    {stage.status !== "delivered" && (
                                       <div className="absolute top-full left-1/2 -z-10 mt-0.5 h-full w-0.5 -translate-x-1/2 bg-gray-200" />
                                    )}
                                 </div>

                                 <div className="ml-4 flex-1 text-sm">
                                    <p
                                       className={`${isActive ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground"}`}
                                    >
                                       {stage.label}
                                    </p>
                                 </div>
                              </div>
                           );
                        })}
                  </div>

                  <div className="mt-6 border-t pt-4">
                     <h4 className="mb-2 text-sm font-medium">Need help?</h4>
                     <button className="w-full rounded-lg border px-4 py-2 text-sm transition-colors hover:bg-gray-50">
                        Contact Support
                     </button>
                  </div>
               </div>
            </aside>
         </div>
      </main>
   );
}
