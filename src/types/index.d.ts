export type Address = {
   id: string;
   label: string | null;
   address: string;
   contact: string;
   zone: string | null;
   zoneId: number | null;
   area: string | null;
   areaId: number | null;
};

declare global {
   type Option = Record<"value" | "label", string> & Record<string, string>;

   interface DashboardIconProps extends React.SVGProps<SVGSVGElement> {
      active?: boolean;
      filled?: boolean;
   }

   type Area = {
      id: number;
      name: string;
      zone: number;
   };

   type User = {
      id: string;
      name: string;
      email: string;
      emailVerified: boolean;
      createdAt: Date;
      updatedAt: Date;
      image?: string | null | undefined | undefined;
      role: string;
   };

   type PaymentGateway = Record<
      "name" | "type" | "logo" | "gw" | "r_flag" | "redirectGatewayURL",
      string
   >;

   type GroupPaymentGateway = Record<string, PaymentGateway[]>;

   interface PaymentGatewayResponse {
      gatewayPageURL: string;
      paymentGateways: GroupPaymentGateway | null;
   }

   type OrderStatus =
      | "pending"
      | "confirmed"
      | "processing"
      | "shipped"
      | "out_for_delivery"
      | "delivered"
      | "cancelled"
      | "returned";
}
