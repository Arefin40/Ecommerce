import React from "react";
import ProfileForm from "./profile-form";
import AddressBook from "./address-book";
import Container from "@/components/Container";

async function Profile() {
   return (
      <Container className="box-container space-y-4">
         <h2 className="text-foreground text-xl font-bold">My Profile</h2>
         <ProfileForm />
         <AddressBook />
      </Container>
   );
}
export default Profile;
