"use client";

import React from "react";
import toast from "react-hot-toast";
import type { Address } from "@/types";
import { Pencil, Trash2 } from "lucide-react";
import { deleteAddress } from "@/actions/address";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { EditAddressForm } from "./AddressCardForm";

export function AddressCard({ address }: { address: Address }) {
   const [isOpen, setIsOpen] = React.useState(false);

   const handleDelete = async () => {
      try {
         await deleteAddress(address.id);
      } catch (error) {
         toast.error("Failed to delete address");
         console.error("Error deleting address:", error);
      }
   };

   return (
      <>
         <div
            data-testid="address-card"
            className="border-border relative space-y-2 rounded-lg border p-4 text-sm"
         >
            <div className="absolute top-3 right-3">
               <EditAddressForm address={address}>
                  <button className="text-muted-foreground hover:text-foreground">
                     <Pencil size={16} />
                  </button>
               </EditAddressForm>

               <button
                  onClick={() => setIsOpen(true)}
                  data-testid="delete-address-button"
                  className="text-muted-foreground hover:text-destructive ml-2 disabled:cursor-not-allowed disabled:opacity-50"
               >
                  <Trash2 size={16} />
               </button>
            </div>

            <h3 data-testid="address-label" className="font-medium">
               {address.label}
            </h3>
            <address className="text-muted-foreground not-italic">
               {address.address}
               <br />
               {address.area}, {address.zone}
               <br />
               {address.contact}
            </address>
         </div>

         <ConfirmDialog
            open={isOpen}
            onOpenChange={setIsOpen}
            onConfirm={handleDelete}
            onCancel={() => setIsOpen(false)}
            title="Delete Item"
            description="Are you sure you want to delete this item?"
            variant="danger"
         />
      </>
   );
}
