import { useQuery } from "@tanstack/react-query";

const fetchPaymentGateways = async (orderId: string): Promise<PaymentGatewayResponse | null> => {
   const res = await fetch("/api/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId })
   });

   if (res.status === 200) {
      const responseJSON = await res.json();
      if (responseJSON.data) return responseJSON.data as PaymentGatewayResponse;
   }

   return null;
};

export function usePayment(orderId: string) {
   return useQuery({
      queryKey: ["gateways", { orderId }],
      queryFn: async (): Promise<PaymentGatewayResponse | null> => {
         if (!orderId) return null;
         return await fetchPaymentGateways(orderId);
      }
   });
}
