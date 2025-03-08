"use client";

import React from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { z } from "zod";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/form";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { CurlyUnderline, UserPassword } from "@/icons";

const schema = z.object({
   email: z.string().email("Invalid email address")
});

type FormData = z.infer<typeof schema>;

export default function ResetPasswordPage() {
   const { data: session } = authClient.useSession();

   const {
      register,
      handleSubmit,
      setValue,
      formState: { errors }
   } = useForm<FormData>({
      resolver: zodResolver(schema)
   });

   React.useEffect(() => {
      if (session?.user.email) {
         setValue("email", session?.user.email);
      }
   }, [session, setValue]);

   const onSubmit = async ({ email }: FormData) => {
      await authClient.forgetPassword(
         { email, redirectTo: "/reset-password" },
         {
            onSuccess: () => {
               toast("An email is sent to this email address");
            }
         }
      );
   };

   return (
      <main className="mx-auto mt-20 grid w-full max-w-md gap-y-8 rounded-xl bg-white shadow-2xl lg:mt-10">
         <header className="flex flex-col items-center space-y-2 px-6 pt-8 text-center sm:space-y-4">
            <div className="relative isolate size-14 before:absolute before:inset-0 before:-z-10 before:size-full before:scale-140 before:rounded-full before:bg-radial before:from-gray-200 before:to-gray-50/0">
               <div className="border-border flex-center z-10 aspect-square rounded-full border bg-white shadow">
                  <UserPassword className="text-muted-foreground size-7" />
               </div>
            </div>

            <div className="space-y-2 text-center">
               <h3 className="text-foreground text-lg font-bold">Forgot Password?</h3>

               <p className="text-muted-foreground text-sm font-medium">
                  No worries! We will send you reset instructions.
               </p>
            </div>
         </header>

         <form
            method="post"
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col items-center gap-y-5 px-6 py-2 sm:py-4"
         >
            <Input
               {...register("email")}
               label="Email Address"
               placeholder="Enter email"
               autoComplete="email"
               startIcon={<Mail className="text-muted-foreground size-4 stroke-current" />}
               className="w-full grow"
               error={errors.email}
            />

            <Button className="w-full">Send Email</Button>
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
