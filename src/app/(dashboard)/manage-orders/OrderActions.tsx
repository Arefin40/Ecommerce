"use client";

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import React from "react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { updateOrderStatus } from "@/actions/orders";

function OrderActions({ orderId }: { orderId: string }) {
   const handleStatusUpdate = async (orderId: string, status: Exclude<OrderStatus, "pending">) => {
      await updateOrderStatus(orderId, status);
   };

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button data-testid="manage-order-button" variant="ghost" size="icon">
               <MoreHorizontal className="h-4 w-4" />
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent>
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem
               data-testid="processing-button"
               onClick={() => handleStatusUpdate(orderId, "processing")}
            >
               Mark as Processing
            </DropdownMenuItem>
            <DropdownMenuItem
               data-testid="shipped-button"
               onClick={() => handleStatusUpdate(orderId, "shipped")}
            >
               Mark as Shipped
            </DropdownMenuItem>
            <DropdownMenuItem
               data-testid="delivered-button"
               onClick={() => handleStatusUpdate(orderId, "delivered")}
            >
               Mark as Delivered
            </DropdownMenuItem>
            <DropdownMenuItem
               data-testid="cancelled-button"
               onClick={() => handleStatusUpdate(orderId, "cancelled")}
            >
               Cancel Order
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}

export default OrderActions;
