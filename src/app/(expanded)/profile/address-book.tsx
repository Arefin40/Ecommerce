import React from "react";
import { AddressCard } from "./AddressCard";
import { CreateNewAddressForm } from "./AddressCardForm";
import { fetchUserAddresses } from "@/actions/address";

async function AddressBook() {
   const response = await fetchUserAddresses();
   const addresses = response.success ? response.data : [];

   return (
      <section className="grid gap-x-12 gap-y-8 rounded-xl bg-white p-6 lg:grid-cols-[1fr_2fr]">
         <div className="border-border space-y-1.5">
            <h2 className="text-lg font-bold">Address Book</h2>
            <p className="text-muted-foreground leading-snug">
               Manage your saved addresses for faster checkout. Your addresses are stored securely
               and used only for shipping your orders.
            </p>
         </div>

         <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {addresses?.map((address) => <AddressCard key={address.id} address={address} />)}

            <CreateNewAddressForm />
         </div>
      </section>
   );
}

export default AddressBook;
