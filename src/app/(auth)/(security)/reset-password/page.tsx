"use client";

import React from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { z } from "zod";
import { Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { InputPassword } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/lib/auth-schema";
import { useRouter, useSearchParams } from "next/navigation";
import { CurlyUnderline, UserPassword, Shield } from "@/icons";

type FormData = z.infer<typeof resetPasswordSchema>;

function ResetPasswordContent() {
   const router = useRouter();
   const searchParams = useSearchParams();
   const error = searchParams.get("error");
   const token = searchParams.get("token");

   const {
      register,
      handleSubmit,
      formState: { errors }
   } = useForm<FormData>({
      resolver: zodResolver(resetPasswordSchema)
   });

   const onSubmit = async (data: FormData) => {
      await authClient.resetPassword(
         { newPassword: data.password, token: token ?? undefined },
         {
            onError: (ctx) => {
               toast.error(ctx.error.message);
            },
            onSuccess: () => {
               toast.success("Password reset successful. Login to continue.");
               router.push("/login");
            }
         }
      );
   };

   if (error === "invalid_token") {
      return (
         <main className="border-border mx-auto mt-20 grid w-full max-w-lg gap-y-4 rounded-xl border bg-white p-1 shadow-2xl shadow-red-100 lg:mt-10">
            <div className="flex-center rounded-xl bg-orange-50 py-12">
               <Shield />
            </div>

            <div className="space-y-3 px-6 pb-6 text-center">
               <h4 className="font-bold text-orange-600">Bad Request</h4>
               <p>The reset password link is invalid or has expired. Please request a new one.</p>
            </div>
         </main>
      );
   } else {
      return (
         <main className="border-border mx-auto mt-20 grid w-full max-w-md gap-y-8 rounded-xl border bg-white shadow-2xl lg:mt-10">
            <header className="flex flex-col items-center space-y-2 px-6 pt-8 text-center sm:space-y-4">
               <div className="relative isolate size-14 before:absolute before:inset-0 before:-z-10 before:size-full before:scale-140 before:rounded-full before:bg-radial before:from-gray-200 before:to-gray-50/0">
                  <div className="border-border flex-center z-10 aspect-square rounded-full border bg-white shadow">
                     <UserPassword className="text-muted-foreground size-7" />
                  </div>
               </div>

               <div className="space-y-2 text-center">
                  <h3 className="text-foreground text-lg font-bold">Create New Password</h3>

                  <p className="text-muted-foreground text-sm font-medium">
                     New password should be different from the previous one
                  </p>
               </div>
            </header>

            <form
               method="post"
               onSubmit={handleSubmit(onSubmit)}
               className="flex w-full flex-col items-center gap-y-5 px-6 py-2 sm:py-4"
            >
               <InputPassword
                  {...register("password")}
                  label="New Password"
                  placeholder="Enter a password"
                  autoComplete="new-password"
                  startIcon={<Lock className="text-muted-foreground size-4 stroke-current" />}
                  className="w-full grow"
                  error={errors.password}
               />

               <InputPassword
                  {...register("confirmPassword")}
                  label="Confirm Password"
                  placeholder="Enter the password again"
                  autoComplete="new-password"
                  startIcon={<Lock className="text-muted-foreground size-4 stroke-current" />}
                  className="w-full grow"
                  error={errors.confirmPassword}
               />

               <Button className="w-full max-w-64">Change Password</Button>
            </form>

            <footer className="flex-center bg-muted/50 gap-x-2 rounded px-3 py-3 text-sm">
               <span>Remember Password?</span>
               <div className="relative inline-block">
                  <Link href="/login" className="text-foreground text-sm font-bold outline-none">
                     Sign in
                  </Link>
                  <CurlyUnderline />
               </div>
            </footer>
         </main>
      );
   }
}

export default function ResetPasswordPage() {
   return (
      <React.Suspense>
         <ResetPasswordContent />
      </React.Suspense>
   );
}
