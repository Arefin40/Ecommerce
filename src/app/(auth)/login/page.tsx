import React from "react";
import Link from "next/link";
import SignInForm from "./signin-form";

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
               <svg
                  viewBox="0 0 68 7"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-muted-foreground absolute top-full left-1/2 w-full -translate-x-1/2 stroke-current"
               >
                  <path
                     d="M1.021 4.03s40.743-7.515 65.96 0C36.64-2.514 20.703 6.313 20.703 6.313"
                     fill="none"
                     strokeWidth="1.5"
                     strokeMiterlimit="0"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                  />
               </svg>
            </div>
         </div>
      </main>
   );
}
