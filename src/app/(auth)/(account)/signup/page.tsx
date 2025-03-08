import React from "react";
import Link from "next/link";
import SignupForm from "./signup-form";
import { CurlyUnderline } from "@/icons";

function LoginPage() {
   return (
      <main className="mx-auto grid w-full max-w-lg gap-y-8 lg:mt-10">
         <header className="space-y-4">
            <h3 className="text-foreground text-2xl font-bold">Create an account</h3>
            <p className="text-foreground text-sm sm:text-base">
               Welcome! Please fill in the details to get started.
            </p>
         </header>

         <SignupForm />

         <div className="flex-center gap-x-2 px-3">
            <span>Already have an account?</span>
            <div className="relative inline-block">
               <Link href="/login" className="text-foreground outline-none">
                  Sign in
               </Link>
               <CurlyUnderline />
            </div>
         </div>
      </main>
   );
}

export default LoginPage;
