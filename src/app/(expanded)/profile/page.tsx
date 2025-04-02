import React from "react";
import ProfileForm from "./profile-form";

async function Profile() {
   return (
      <div className="space-y-8 md:col-span-2">
         <h2 className="text-foreground text-xl font-bold">My Profile</h2>
         <ProfileForm />
      </div>
   );
}
export default Profile;
