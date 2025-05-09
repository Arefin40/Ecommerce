import { db } from "@/db";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { order } from "@/db/schema/checkout";
import fetch from "node-fetch";

const store_id = process.env.SSLCOMMERZ_STORE_ID!;
const store_passwd = process.env.SSLCOMMERZ_STORE_PASSWORD!;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const SSLCOMMERZ_INIT_URL = "https://sandbox.sslcommerz.com/gwprocess/v4/api.php";

type RequestBody = { orderId: string };

export async function POST(request: Request) {
   const session = await auth.api.getSession({ headers: await headers() });
   if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

   try {
      const body: RequestBody = await request.json();
      if (!body) {
         return NextResponse.json({ error: "Initialization data is required" }, { status: 500 });
      }

      const _order = await db.select().from(order).where(eq(order.id, body.orderId)).limit(1);
      if (_order.length === 0) {
         return NextResponse.json({ error: "Order not found" }, { status: 404 });
      }
      const [orderData] = _order;
      const amountToPay =
         parseFloat(orderData.totalPrice) + (orderData.shippingMethod === "EXPRESS" ? 200 : 100);

      const formData = new FormData();
      formData.append("store_id", store_id);
      formData.append("store_passwd", store_passwd);
      formData.append("total_amount", String(amountToPay));
      formData.append("currency", "BDT");
      formData.append("tran_id", `trxId-${Date.now()}`);
      formData.append("success_url", `${BASE_URL}/api/payment/success?id=${orderData.id}`);
      formData.append("fail_url", `${BASE_URL}/api/payment/fail?id=${orderData.id}`);
      formData.append("cancel_url", `${BASE_URL}/api/payment/cancel?id=${orderData.id}`);
      formData.append("shipping_method", "Courier");
      formData.append("product_name", "Miscellaneous");
      formData.append("product_category", "General");
      formData.append("product_profile", "general");
      formData.append("cus_name", orderData.billingName);
      formData.append("cus_email", session.user.email);
      formData.append("cus_add1", "Dhaka, Bangladesh");
      formData.append("cus_city", "Dhaka");
      formData.append("cus_postcode", "1000");
      formData.append("cus_country", "Bangladesh");
      formData.append("cus_phone", orderData.billingContact);
      formData.append("ship_name", orderData.shippingName);
      formData.append("ship_add1", orderData.shippingAddress);
      formData.append("ship_city", orderData.shippingZone);
      formData.append("ship_postcode", "1211");
      formData.append("ship_country", "Bangladesh");

      const response = await fetch(SSLCOMMERZ_INIT_URL, { method: "POST", body: formData });
      const responseJSON = (await response.json()) as Record<string, unknown>;
      const gatewayResponse: PaymentGatewayResponse = {
         gatewayPageURL: "",
         paymentGateways: {}
      };

      if ("GatewayPageURL" in responseJSON) {
         gatewayResponse.gatewayPageURL = responseJSON["GatewayPageURL"] as string;
      }

      if ("desc" in responseJSON) {
         const gateways = responseJSON["desc"] as PaymentGateway[];
         const group_gateways = gateways.reduce((acc: GroupPaymentGateway, gateway) => {
            if (
               !gateway.redirectGatewayURL ||
               (gateway.type === "mobilebanking" && gateway.name === "AB Direct")
            )
               return acc;
            if (!(gateway.type === "mobilebanking" || gateway.type === "internetbanking")) {
               if (gateway.name.includes("-")) return acc;
               gateway.type = "card";
            }

            if (!acc[gateway.type]) acc[gateway.type] = [];
            acc[gateway.type].push(gateway);
            return acc;
         }, {} as GroupPaymentGateway);
         gatewayResponse.paymentGateways = group_gateways;
      }
      return NextResponse.json({ data: gatewayResponse }, { status: 200 });
   } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Payment initialization failed" }, { status: 500 });
   }
}
