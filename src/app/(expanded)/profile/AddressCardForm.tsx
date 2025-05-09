"use client";

import React from "react";
import toast from "react-hot-toast";
import { Address } from "@/types";
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger
} from "@/components/ui/dialog";
import { zones } from "@/lib/data";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, InputAutoComplete } from "@/components/ui/form";
import { createAddress, updateAddress, getAllAreas } from "@/actions/address";
import { addressSchema, type AddressFormData } from "@/lib/validation/address";
import { createOptions } from "@/lib/utils";

interface AddressFormProps {
   address?: Address;
   onSuccess?: () => void;
}

function AddressForm({ address, onSuccess }: AddressFormProps) {
   const form = useForm<AddressFormData>({
      resolver: zodResolver(addressSchema),
      defaultValues: address
         ? {
              label: address.label || "",
              address: address.address,
              zone: address.zone || "",
              area: address.area || "",
              contact: address.contact
           }
         : undefined
   });
   const { handleSubmit, register, reset, setValue, formState } = form;
   const { errors, isSubmitting } = formState;
   const [areas, setAreas] = React.useState<Option[]>([]);

   React.useEffect(() => {
      const fetchAllAreas = async () => {
         const areas = await getAllAreas();
         setAreas(createOptions(areas));
      };
      fetchAllAreas();
   }, []);

   const setZone = async (value: string) => {
      setValue("zone", value);
      const areas = await getAllAreas();
      setAreas(createOptions(areas));
   };

   const onSubmit = async (data: AddressFormData) => {
      if (address) {
         if (data.zone === address.zone) data.zone = String(address.zoneId);
         if (data.area === address.area) data.area = String(address.areaId);
      }

      try {
         const result = address ? await updateAddress(address.id, data) : await createAddress(data);

         if (result.success) {
            toast.success(
               result.message || `Address ${address ? "updated" : "added"} successfully`
            );
            reset();
            onSuccess?.();
         } else {
            toast.error(result.error || `Failed to ${address ? "update" : "add"} address`);
         }
      } catch (error) {
         toast.error(`Failed to ${address ? "update" : "add"} address`);
         console.error("Error saving address:", error);
      }
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4" autoComplete="on">
         <Input
            label="Address Label"
            placeholder="e.g. Home, Office, etc."
            error={errors.label}
            autoComplete="off"
            {...register("label")}
         />

         <Input
            label="Street Address"
            placeholder="House/Building number and street"
            error={errors.address}
            autoComplete="street-address"
            {...register("address")}
         />

         <div className="grid grid-cols-2 gap-4">
            <InputAutoComplete
               options={zones}
               label="Zone/City"
               error={errors.zone}
               emptyMessage="No zone found"
               autoComplete="address-level1"
               placeholder="Select your city"
               onValueChange={(zone) => setZone(zone.value)}
               {...register("zone")}
            />

            <InputAutoComplete
               options={areas}
               label="Area"
               error={errors.area}
               emptyMessage="No area found"
               autoComplete="address-level2"
               placeholder="Select your area/locality"
               onValueChange={(area) => setValue("area", area.value)}
               {...register("area")}
            />
         </div>

         <Input
            label="Contact Number"
            placeholder="Phone number for delivery"
            error={errors.contact}
            autoComplete="tel"
            {...register("contact")}
         />

         <div className="flex justify-center gap-3 pt-2">
            <DialogClose useCrossClasses={false} asChild>
               <Button type="button" variant="outline">
                  Cancel
               </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
               {isSubmitting ? (
                  <>
                     <LoaderCircle className="size-4 animate-spin" /> Saving...
                  </>
               ) : (
                  "Save Address"
               )}
            </Button>
         </div>
      </form>
   );
}

export function CreateNewAddressForm() {
   const [open, setOpen] = React.useState(false);

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>
            <Button variant="outline" className="flex h-full items-center gap-2">
               <Plus />
               New Address
            </Button>
         </DialogTrigger>

         <DialogContent>
            <DialogHeader>
               <DialogTitle className="text-center">Add New Address</DialogTitle>
               <DialogDescription className="text-center">
                  Fill in the details below to add a new address to your address book.
               </DialogDescription>
            </DialogHeader>

            <AddressForm onSuccess={() => setOpen(false)} />
         </DialogContent>
      </Dialog>
   );
}

interface EditAddressFormProps {
   address: Address;
   children: React.ReactNode;
}

export function EditAddressForm({ address, children }: EditAddressFormProps) {
   const [open, setOpen] = React.useState(false);

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>{children}</DialogTrigger>

         <DialogContent>
            <DialogHeader>
               <DialogTitle className="text-center">Edit Address</DialogTitle>
               <DialogDescription className="text-center">
                  Edit the details below to update the address.
               </DialogDescription>
            </DialogHeader>

            <AddressForm address={address} onSuccess={() => setOpen(false)} />
         </DialogContent>
      </Dialog>
   );
}
