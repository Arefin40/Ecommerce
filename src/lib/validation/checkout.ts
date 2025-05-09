import * as z from "zod";

export const checkoutSchema = z.object({
   // shipping address
   shipping_name: z.string().min(1, "Name is required"),
   shipping_phone: z.string().min(1, "Phone number is required"),
   shipping_address: z.string().min(1, "Address is required"),
   shipping_zone: z.string().min(1, "Zone is required"),
   shipping_area: z.string().min(1, "Area is required"),
   // billing address
   billing_name: z.string().min(1, "Name is required"),
   billing_phone: z.string().min(1, "Phone number is required"),
   billing_address: z.string().min(1, "Address is required"),
   billing_zone: z.string().min(1, "Zone is required"),
   billing_area: z.string().min(1, "Area is required"),
   delivery_method: z.enum(["STANDARD", "EXPRESS"], {
      required_error: "Delivery method is required"
   })
});

export const defaultCheckoutValues: CheckoutFormValues = {
   shipping_name: "",
   shipping_phone: "",
   shipping_address: "",
   shipping_zone: "",
   shipping_area: "",
   billing_name: "",
   billing_phone: "",
   billing_address: "",
   billing_zone: "",
   billing_area: "",
   delivery_method: "STANDARD"
};

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
