import React from "react";
import { zones } from "@/lib/data/zones";
import { Input, InputAutoComplete } from "@/components/ui/form";
import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { CheckoutFormValues } from "@/lib/validation/checkout";

interface CheckoutFormProps {
   register: UseFormRegister<CheckoutFormValues>;
   errors: FieldErrors<CheckoutFormValues>;
   setValue: UseFormSetValue<CheckoutFormValues>;
   setZone: (name: "shipping_zone" | "billing_zone", zone: Option) => void;
   shippingAreas: { value: string; label: string }[];
   billingAreas: { value: string; label: string }[];
}

function CheckoutForm({
   register,
   errors,
   setValue,
   setZone,
   shippingAreas,
   billingAreas
}: CheckoutFormProps) {
   return (
      <div className="flex flex-col gap-y-6">
         <div className="border-border rounded-lg border bg-white p-6">
            <h2 className="mb-8 text-xl font-semibold">Shipping Details</h2>

            <div className="flex flex-col gap-y-6">
               <div className="flex gap-5">
                  <Input
                     label="Name"
                     placeholder="Name"
                     type="text"
                     {...register("shipping_name")}
                     error={errors.shipping_name}
                  />
                  <Input
                     label="Phone Number"
                     placeholder="Phone Number"
                     type="tel"
                     {...register("shipping_phone")}
                     error={errors.shipping_phone}
                  />
               </div>
               <Input
                  label="Address"
                  placeholder="Shipping address details"
                  {...register("shipping_address")}
                  error={errors.shipping_address}
               />
               <div className="grid grid-cols-2 gap-5">
                  <InputAutoComplete
                     options={zones}
                     label="Zone/City"
                     error={errors.shipping_zone}
                     emptyMessage="No zone found"
                     autoComplete="address-level1"
                     placeholder="Select city"
                     onValueChange={(zone) => setZone("shipping_zone", zone)}
                  />
                  <InputAutoComplete
                     options={shippingAreas}
                     label="Area"
                     error={errors.shipping_area}
                     emptyMessage="No area found"
                     autoComplete="address-level2"
                     placeholder="Select area/locality"
                     onValueChange={(area) => setValue("shipping_area", area.label)}
                     {...register("shipping_area")}
                  />
               </div>
            </div>
         </div>

         <div className="border-border rounded-lg border bg-white p-6">
            <h2 className="mb-8 text-xl font-semibold">Billing Details</h2>

            <div className="flex flex-col gap-y-6">
               <div className="flex gap-5">
                  <Input
                     label="Name"
                     placeholder="Name"
                     type="text"
                     {...register("billing_name")}
                     error={errors.billing_name}
                  />
                  <Input
                     label="Phone Number"
                     placeholder="Phone number"
                     type="tel"
                     {...register("billing_phone")}
                     error={errors.billing_phone}
                  />
               </div>
               <Input
                  label="Address"
                  {...register("billing_address")}
                  placeholder="Billing address details"
                  error={errors.billing_address}
               />
               <div className="grid grid-cols-2 gap-5">
                  <InputAutoComplete
                     options={zones}
                     label="Zone/City"
                     error={errors.billing_zone}
                     emptyMessage="No zone found"
                     autoComplete="address-level1"
                     placeholder="Select city"
                     onValueChange={(zone) => setZone("billing_zone", zone)}
                     {...register("billing_zone")}
                  />
                  <InputAutoComplete
                     options={billingAreas}
                     label="Area"
                     error={errors.billing_area}
                     emptyMessage="No area found"
                     autoComplete="address-level2"
                     placeholder="Select area/locality"
                     onValueChange={(area) => setValue("billing_area", area.label)}
                     {...register("billing_area")}
                  />
               </div>
            </div>
         </div>
      </div>
   );
}

export default CheckoutForm;
