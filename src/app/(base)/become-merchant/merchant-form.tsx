"use client";

import React from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, InputPassword } from "@/components/ui/form/input";
import { Button } from "@/components/ui/button";
import { merchantFormSchema, type MerchantFormValues } from "@/lib/validation/merchant";
import { merchantApplication } from "@/actions/merchants";
import { useRouter } from "next/navigation";

export function MerchantForm() {
   const router = useRouter();

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isSubmitting }
   } = useForm<MerchantFormValues>({
      resolver: zodResolver(merchantFormSchema)
   });

   const onSubmit = async (data: MerchantFormValues) => {
      try {
         const { name, email, password, nid, mobile } = data;

         // Sign up the user
         const user = await authClient.signUp.email(
            { email, password, name, role: "user" },
            {
               onError: () => {
                  toast.error("Failed to submit the application");
                  return;
               }
            }
         );

         if (!user.data?.user.id) {
            throw new Error("Failed to submit the application");
         }

         // Submit merchant application
         const response = await merchantApplication({ id: user.data.user.id, nid, mobile });

         if (!response.success) {
            throw new Error(response.error);
         }

         toast.success("Successfully submitted the application");
         reset();
         router.push("/merchant-application-submitted");
      } catch (error) {
         toast.error(error instanceof Error ? error.message : "Failed to submit the application");
      }
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
         <div className="space-y-4">
            <Input label="Name" {...register("name")} error={errors.name} autoComplete="name" />

            <Input
               label="Email"
               type="email"
               {...register("email")}
               error={errors.email}
               autoComplete="email"
            />

            <div className="grid grid-cols-2 gap-4">
               <Input
                  label="NID Number"
                  {...register("nid")}
                  error={errors.nid}
                  autoComplete="off"
               />

               <Input
                  label="Mobile Number"
                  {...register("mobile")}
                  error={errors.mobile}
                  autoComplete="tel"
                  placeholder="+880 1XXXXXXXXX"
               />
            </div>

            <InputPassword
               label="Password"
               {...register("password")}
               error={errors.password}
               autoComplete="new-password"
            />
         </div>

         <Button type="submit" className="w-full" disabled={isSubmitting}>
            Become Seller
         </Button>
      </form>
   );
}
