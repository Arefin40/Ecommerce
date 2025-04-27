"use client";

import React from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import { Google } from "@/icons";
import { Button } from "@/components/ui/button";
import { Input, InputPassword, FormSeparator } from "@/components/ui/form";
import { signUpSchema } from "@/lib/auth-schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

type FormFields = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
   const router = useRouter();
   const {
      register,
      reset,
      handleSubmit,
      formState: { errors }
   } = useForm<FormFields>({ resolver: zodResolver(signUpSchema) });

   const onSubmit: SubmitHandler<FormFields> = async (data) => {
      const { email, password, fname, lname } = data;

      await authClient.signUp.email(
         {
            email,
            password,
            name: fname + " " + lname,
            callbackURL: "/",
            role: "user"
         },
         {
            onSuccess: () => {
               toast.success("Account created successfully");
               reset();
               router.push("/");
            },
            onError: () => {
               toast.error("Failed to create account");
            }
         }
      );
   };

   const signInWithGoogle = async () => {
      await authClient.signIn.social(
         { provider: "google", callbackURL: "/" },
         {
            onSuccess: () => {
               toast.success("Account created successfully");
               reset();
               router.push("/");
            },
            onError: () => {
               toast.error("Failed to log in!");
            }
         }
      );
   };

   return (
      <form
         method="post"
         onSubmit={handleSubmit(onSubmit)}
         className="text-foreground flex flex-col gap-y-8 pt-3"
      >
         <Button
            type="button"
            variant="outline"
            className="w-full gap-x-3 text-sm"
            onClick={signInWithGoogle}
         >
            <Google />
            <span>Continue with Google</span>
         </Button>

         <FormSeparator>Or continue with</FormSeparator>

         <div className="grid w-full items-center gap-5">
            <div className="flex flex-wrap gap-5">
               <Input
                  {...register("fname")}
                  label="First name"
                  placeholder="Enter your first name"
                  autoComplete="given-name"
                  error={errors.fname}
               />
               <Input
                  {...register("lname")}
                  label="Last name"
                  placeholder="Enter your last name"
                  autoComplete="family-name"
                  error={errors.lname}
               />
            </div>

            <Input
               {...register("email")}
               label="Email"
               placeholder="Enter email address"
               autoComplete="email"
               error={errors.email}
            />

            <InputPassword
               {...register("password")}
               label="Password"
               placeholder="Enter a password"
               autoComplete="new-password"
               error={errors.password}
            />
            <InputPassword
               {...register("confirmPassword")}
               label="Confirm Password"
               placeholder="Enter the password again"
               autoComplete="new-password"
               error={errors.confirmPassword}
            />
         </div>

         <Button color="primary" className="w-full">
            Create account
         </Button>
      </form>
   );
}
