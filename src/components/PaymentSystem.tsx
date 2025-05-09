import { useState } from "react";
import { usePayment } from "@/hooks/payment";
import GatewayList from "@/components/GatewayList";

type PaymentMethod = "CASH" | "SSLCOMMERZ" | "STRIPE";
const paymentMethods: { id: PaymentMethod; label: string }[] = [
   { id: "SSLCOMMERZ", label: "MFS / Card" },
   { id: "CASH", label: "Cash On Delivery" }
];

function PaymentSystem({
   orderId,
   onSelect,
   selectedGateway
}: {
   orderId: string;
   onSelect: (gatewayUrl: string) => void;
   selectedGateway?: string;
}) {
   const { data: gateways } = usePayment(orderId);
   const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("SSLCOMMERZ");

   return (
      <section className="border-border mt-6 flex flex-col gap-y-8 rounded-lg border bg-white p-6">
         <h2 className="text-xl font-semibold">Payment Method</h2>

         <div className="flex items-center gap-3 text-sm">
            {paymentMethods.map(({ id, label }) => (
               <button
                  key={id}
                  type="button"
                  className={`rounded-md border-[1.5px] px-4 py-2 ${
                     paymentMethod === id
                        ? "text-foreground border-blue-400"
                        : "border-transparent bg-gray-200/60 text-gray-600 hover:bg-gray-200"
                  }`}
                  onClick={() => setPaymentMethod(id)}
               >
                  {label}
               </button>
            ))}
         </div>

         {gateways && gateways.paymentGateways && (
            <>
               <GatewayList
                  type="Mobile Banking"
                  onSelect={onSelect}
                  selectedGateway={selectedGateway}
                  gateways={gateways.paymentGateways["mobilebanking"]}
               />
               <GatewayList
                  type="Internet Banking"
                  onSelect={onSelect}
                  selectedGateway={selectedGateway}
                  gateways={gateways.paymentGateways["internetbanking"]}
               />
               <GatewayList
                  type="Credit card"
                  onSelect={onSelect}
                  selectedGateway={selectedGateway}
                  gateways={gateways.paymentGateways["card"]}
               />
            </>
         )}
      </section>
   );
}

export default PaymentSystem;
