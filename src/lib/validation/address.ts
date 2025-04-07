import * as z from "zod";

export const addressSchema = z.object({
   label: z.string().min(1, "Address label is required"),
   address: z.string().min(1, "Street address is required"),
   area: z.string().min(1, "Area is required"),
   zone: z.string().min(1, "Zone/City is required"),
   contact: z
      .string()
      .min(1, "Contact number is required")
      .regex(/^(?:\+880|0)(1[3-9]\d{8})$/, "Must be a valid Bangladeshi phone number")
      .transform((val) => {
         if (val.startsWith("0")) return "+880" + val.slice(1);
         return val;
      })
});

export type AddressFormData = z.infer<typeof addressSchema>;
