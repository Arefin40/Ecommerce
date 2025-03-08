import React from "react";
import Link from "next/link";
import SignInForm from "./signin-form";
import { CurlyUnderline } from "@/icons";

export default function LoginPage() {
   return (
      <main className="mx-auto grid w-full max-w-lg gap-y-8 lg:mt-16">
         <header className="space-y-4">
            <h3 className="text-foreground text-2xl font-bold">Sign In</h3>
            <p className="text-foreground text-sm sm:text-base">
               Welcome! Please fill in the details to get started.
            </p>
         </header>

         <SignInForm />

         <div className="flex-center gap-x-2 px-3">
            <span>Don&apos;t have an account?</span>
            <div className="relative inline-block">
               <Link href="/signup" className="text-foreground outline-none">
                  Create one
               </Link>
               <CurlyUnderline />
            </div>
         </div>
      </main>
   );
}
