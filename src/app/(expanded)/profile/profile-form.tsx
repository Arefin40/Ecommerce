"use client";

import React from "react";
import Image from "next/image";
import { z } from "zod";
import { Input, Label } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateProfileSchema } from "@/lib/auth-schema";
import { uploadImagesToCloudinary } from "@/actions/image-upload";
import { updateProfile } from "@/actions/update-profile";
import toast from "react-hot-toast";

type FormFields = z.infer<typeof updateProfileSchema>;

interface updatedDataType {
   image?: string;
   name?: string;
   email?: string;
}

function ProfileForm() {
   const { data: session } = authClient.useSession();

   const {
      register,
      handleSubmit,
      watch,
      setValue,
      formState: { errors }
   } = useForm<FormFields>({ resolver: zodResolver(updateProfileSchema) });

   const onSubmit: SubmitHandler<FormFields> = async ({ image, name, email }) => {
      const updatedData: updatedDataType = {};

      // find out the changes
      if (name && name !== session?.user.name) updatedData.name = name;
      if (email && email !== session?.user.email) updatedData.email = email;
      if (image) {
         const formData = new FormData();
         formData.append("image", image);
         formData.append("upload_preset", "shobai");

         try {
            const imageUrls = await uploadImagesToCloudinary(formData);
            if (imageUrls.success && imageUrls.urls) updatedData.image = imageUrls.urls[0];
         } catch (error) {
            console.error("Error uploading image:", error);
         }
      }

      if (!session?.user.id) return;

      try {
         const result = await updateProfile({
            id: session.user.id,
            ...updatedData
         });

         if (result.success) {
            toast.success("Profile updated successfully");
         } else {
            toast.error("Failed to update profile");
         }
      } catch (error) {
         toast.error("Failed to update profile");
         console.error("Error updating profile:", error);
      }
   };

   // Generate preview URL from the watched file
   const imageFile = watch("image");
   const previewImage = imageFile?.[0] ? URL.createObjectURL(imageFile[0]) : null;

   // Update default values when session data is available
   React.useEffect(() => {
      if (session?.user) {
         setValue("name", session.user.name);
         setValue("email", session.user.email);
      }
   }, [session, setValue]);

   // Cleanup object URL to prevent memory leaks
   React.useEffect(() => {
      return () => {
         if (previewImage && imageFile instanceof File) {
            URL.revokeObjectURL(previewImage);
         }
      };
   }, [previewImage, imageFile]);

   return (
      <form
         method="post"
         encType="multipart/form-data"
         onSubmit={handleSubmit(onSubmit)}
         className="grid grid-cols-[1fr_2fr] gap-x-12 gap-y-8 rounded-xl bg-white p-6"
      >
         <div className="border-border space-y-1.5">
            <h2 className="text-lg font-bold">Personal Information</h2>
            <p className="text-muted-foreground leading-snug">
               This information will be displayed publicly so be careful what you share.
            </p>
         </div>

         <div className="space-y-8">
            <div className="grid items-center justify-between gap-x-5 gap-y-4">
               <div className="space-y-2">
                  <Label htmlFor="image">Profile Photo</Label>
                  <p className="text-muted-foreground text-sm">
                     Upload a photo to personalize your profile. Supported formats: PNG, JPEG, JPG.
                  </p>
               </div>

               <div className="inline-flex">
                  <div className="relative">
                     <Image
                        priority
                        src={previewImage || session?.user.image || "/images/user.png"}
                        alt="Profile picture"
                        width="144"
                        height="144"
                        className="pointer-events-none size-36 rounded-full border border-gray-200 object-cover"
                     />

                     <input
                        multiple
                        type="file"
                        id="image"
                        className="absolute inset-0 z-50 opacity-0"
                        accept="image/png, image/jpeg, image/jpg"
                        {...register("image")}
                     />
                  </div>

                  {errors.image && (
                     <span className="text-destructive text-sm">
                        {errors.image.message as string}
                     </span>
                  )}
               </div>
            </div>

            <div className="grid grid-cols-2 gap-x-6">
               <Input
                  id="name"
                  label="Full Name"
                  autoComplete="name"
                  {...register("name")}
                  error={errors.name}
               />

               <Input
                  id="email"
                  label="Email"
                  autoComplete="email"
                  {...register("email")}
                  error={errors.email}
               />
            </div>
         </div>

         <Button className="col-start-2 max-w-xs">Save Changes</Button>
      </form>
   );
}

export default ProfileForm;
