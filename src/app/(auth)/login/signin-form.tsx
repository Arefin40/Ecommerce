"use client";

import React from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Google } from "@/icons";
import { Lock, User } from "lucide-react";
import { Input, InputPassword, FormSeparator } from "@/components/ui/form";
import { logInSchema } from "@/lib/auth-schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";

type FormFields = z.infer<typeof logInSchema>;

export default function SignInForm() {
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors }
   } = useForm<FormFields>({ resolver: zodResolver(logInSchema) });

   const onSubmit: SubmitHandler<FormFields> = async (data) => {
      const { email, password } = data;
      await authClient.signIn.email(
         { email, password, callbackURL: "/" },
         {
            onSuccess: () => {
               toast.success("Logged in successfully");
            }
         }
      );
   };

   const signInWithGoogle = async () => {
      await authClient.signIn.social(
         { provider: "google", callbackURL: "/" },
         {
            onSuccess: () => {
               toast.success("Logged in successfully");
               reset();
            },
            onError: () => {
               toast.error("Log in failed!");
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
            <span>Sign in with Google</span>
         </Button>

         <FormSeparator>Or continue with</FormSeparator>

         <div className="grid w-full items-center gap-6">
            <Input
               {...register("email")}
               label="Email"
               placeholder="Enter email"
               autoComplete="email"
               startIcon={<User className="text-muted-foreground size-4" />}
               error={errors.email}
            />

            <InputPassword
               {...register("password")}
               label="Password"
               placeholder="Enter password"
               autoComplete="current-password"
               startIcon={<Lock className="text-muted-foreground size-4" />}
               error={errors.password}
            />
         </div>

         <Button color="primary" className="w-full">
            Sign In
         </Button>
      </form>
   );
}
