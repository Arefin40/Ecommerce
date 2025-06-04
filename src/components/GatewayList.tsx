import { cn } from "@/lib/utils";
import Image from "next/image";

type GatewayProps = {
   type: string;
   gateways: PaymentGateway[];
   onSelect: (gatewayUrl: string) => void;
   selectedGateway?: string;
};

function GatewayList({ type, gateways, onSelect, selectedGateway }: GatewayProps) {
   return (
      <div data-testid="payment-methods" className="flex flex-col gap-4">
         <h2 className="text-muted-foreground text-xs">{type}</h2>
         <div className="flex flex-wrap gap-4">
            {gateways.map((gateway) => (
               <button
                  key={gateway.gw}
                  type="button"
                  data-testid="payment-gateway"
                  onClick={() => onSelect(gateway.redirectGatewayURL)}
                  className={cn("flex-center overflow-hidden rounded-lg border p-1", {
                     "border-primary bg-primary/10": selectedGateway === gateway.redirectGatewayURL
                  })}
               >
                  <Image src={gateway.logo} width={60} height={60} alt={gateway.name} />
               </button>
            ))}
         </div>
      </div>
   );
}

export default GatewayList;
