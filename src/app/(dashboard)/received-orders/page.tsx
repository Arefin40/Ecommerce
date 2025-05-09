import React from "react";
import { getReceivedOrders } from "@/actions/orders";
import { getStatusBadge, getPaymentStatusBadge } from "@/lib/status-badges";
import DashboardContainer from "@/components/DashboardContainer";

async function ReceivedOrders() {
   const { data: orders } = await getReceivedOrders();

   return (
      <DashboardContainer
         title="Received Orders"
         description="View and manage orders for your store"
      >
         <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {orders?.map((order) => {
               if (order)
                  return (
                     <div
                        key={order.id}
                        className="border-border rounded-lg border bg-white p-4 transition-shadow hover:shadow-md"
                     >
                        <div className="mb-4 flex items-start justify-between">
                           <span className="font-medium uppercase">#{order.id.slice(-12)}</span>
                           <div className="flex flex-col items-end gap-1">
                              {getStatusBadge(order.status)}
                              {getPaymentStatusBadge(order.isPaid)}
                           </div>
                        </div>

                        <div className="space-y-2 text-sm">
                           <div className="flex justify-between">
                              <span className="text-muted-foreground">Date:</span>
                              <span>{new Date(order.orderedAt).toLocaleDateString()}</span>
                           </div>

                           <div className="flex justify-between">
                              <span className="text-muted-foreground">Items:</span>
                              <span>{order.totalItems} items</span>
                           </div>

                           <div className="flex justify-between font-medium">
                              <span className="text-muted-foreground">Store Total:</span>
                              <span>${order.totalPrice}</span>
                           </div>
                        </div>
                     </div>
                  );
            })}
         </div>
      </DashboardContainer>
   );
}

export default ReceivedOrders;
