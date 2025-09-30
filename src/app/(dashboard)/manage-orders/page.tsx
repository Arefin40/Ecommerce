import React from "react";
import Image from "next/image";
import OrderActions from "./OrderActions";
import { getAllOrders } from "@/actions/orders";
import { getStatusBadge, getPaymentStatusBadge } from "@/lib/status-badges";
import DashboardContainer from "@/components/DashboardContainer";

async function ManageOrders() {
   const { data: orders } = await getAllOrders();

   return (
      <DashboardContainer
         title="Manage Orders"
         description="Here you can manage all orders and their status"
      >
         {orders && orders.length > 0 ? (
            <div className="border-border overflow-hidden rounded-md border">
               <table className="min-w-full border-collapse bg-white">
                  <thead className="bg-accent">
                     <tr>
                        <th className="text-muted-foreground px-4 py-3 text-left text-sm font-semibold">
                           Order ID
                        </th>
                        <th className="text-muted-foreground px-4 py-3 text-left text-sm font-semibold">
                           Order Date
                        </th>
                        <th className="text-muted-foreground px-4 py-3 text-left text-sm font-semibold">
                           Order Status
                        </th>
                        <th className="text-muted-foreground px-4 py-3 text-left text-sm font-semibold">
                           Payment Status
                        </th>
                        <th className="text-muted-foreground px-4 py-3 text-left text-sm font-semibold">
                           Amount
                        </th>
                        <th className="text-muted-foreground px-4 py-3 text-right text-sm font-semibold">
                           Actions
                        </th>
                     </tr>
                  </thead>
                  <tbody>
                     {orders?.map((order) => (
                        <tr key={order.id} className="hover:bg-muted/50 border-t">
                           <td className="px-4 py-2 font-medium uppercase">
                              {order.id.slice(-12)}
                           </td>
                           <td className="px-4 py-2">
                              {new Date(order.orderedAt).toLocaleDateString()}
                           </td>
                           <td data-testid="order-status" className="px-4 py-2">
                              {getStatusBadge(order.status)}
                           </td>
                           <td className="px-4 py-2">{getPaymentStatusBadge(order.isPaid)}</td>
                           <td className="px-4 py-2">${order.totalPrice}</td>
                           <td className="flex items-center justify-end px-4 py-2">
                              <OrderActions orderId={order.id} />
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         ) : (
            <div className="flex-center w-full flex-1 flex-col gap-3">
               <Image
                  src="/images/Empty Orders.png"
                  alt="No posts found"
                  width={900}
                  height={900}
                  className="aspect-square w-full max-w-md"
               />
               <h1 className="text-xl">You haven&apos;t received any orders yet</h1>
            </div>
         )}
      </DashboardContainer>
   );
}

export default ManageOrders;
