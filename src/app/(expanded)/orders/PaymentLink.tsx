"use client";

import Link from "next/link";
import { usePayment } from "@/hooks/payment";

function PaymentLink({ orderId }: { orderId: string }) {
   const { data: gateways, isLoading } = usePayment(orderId);

   if (isLoading) return <div className="bg-muted h-6 w-full max-w-20 animate-pulse rounded-md" />;
   if (!gateways?.gatewayPageURL) return null;

   return (
      <Link
         href={gateways.gatewayPageURL}
         className="text-foreground hover:text-primary text-xs font-semibold"
      >
         Pay Now
      </Link>
   );
}

export default PaymentLink;
