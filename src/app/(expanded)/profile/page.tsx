import React from "react";
import ProfileForm from "./profile-form";
import AddressBook from "./address-book";
import Container from "@/components/Container";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function Profile() {
   const session = await auth.api.getSession({ headers: await headers() });
   if (!session?.user) redirect("/login");

   return (
      <Container className="box-container space-y-4 overflow-y-auto">
         <h2 className="text-foreground text-xl font-bold">My Profile</h2>
         <ProfileForm />
         <AddressBook />
      </Container>
   );
}
export default Profile;
