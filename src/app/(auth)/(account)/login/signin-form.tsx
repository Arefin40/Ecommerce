"use client";

import React from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Google } from "@/icons";
import { Lock, User } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { logInSchema } from "@/lib/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input, InputPassword, FormSeparator } from "@/components/ui/form";

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
            },
            onError: (ctx) => {
               toast.error(ctx.error.message || "Sign-in failed!");
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
            onError: (ctx) => {
               toast.error(ctx.error.message || "Sign-in failed!");
            }
         }
      );
   };

   return (
      <form
         method="post"
         data-testid="signin-form"
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
               forgotPasswordUrl="/forgot-password"
            />
         </div>

         <Button data-testid="login-button" color="primary" className="w-full">
            Sign In
         </Button>
      </form>
   );
}
