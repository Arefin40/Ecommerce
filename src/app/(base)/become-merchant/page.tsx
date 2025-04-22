import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { journeySteps } from "@/lib/data";
import { MerchantForm } from "./merchant-form";

export default async function Merchant() {
   return (
      <div className="min-h-screen">
         <header className="bg-background/80 border-border/40 fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-md">
            <div className="box-container mx-auto flex h-16 items-center justify-between px-4">
               <Image
                  priority
                  src="/images/Logo.svg"
                  alt="Logo"
                  width={105}
                  height={20}
                  className="h-5"
               />

               <Button asChild>
                  <Link href="/merchant">Sign In</Link>
               </Button>
            </div>
         </header>

         <main className="pt-24 md:pt-48 lg:pt-28">
            {/* Hero Section */}
            <section className="box-container relative flex flex-col items-center gap-y-4 sm:px-4 md:items-start">
               <div className="flex flex-col gap-y-4">
                  <h1 className="flex flex-col gap-y-1 text-center text-2xl leading-tight tracking-tight sm:text-3xl sm:tracking-normal md:max-w-sm md:text-left lg:max-w-none lg:text-4xl">
                     <span className="font-bold">Start Selling on Shobai</span>
                     <span className="font-semibold">and sell to 50 Crore+ customers</span>
                  </h1>

                  <Image
                     priority
                     src="/images/Merchant Hero Image.png"
                     alt="Merchant Hero Image"
                     width={1026}
                     height={684}
                     className="size-full object-contain md:w-[25rem] lg:w-[40rem] xl:w-[50rem]"
                  />
               </div>

               {/* Form Card */}
               <div className="bg-card shadow-card border-border right-0 w-full max-w-xl rounded-lg border p-6 md:absolute md:top-1/2 md:max-w-sm md:-translate-y-1/2 lg:max-w-md xl:max-w-lg">
                  <div className="mb-6 space-y-2">
                     <h1 className="text-2xl font-bold">Become a Merchant</h1>
                     <p className="text-muted-foreground text-sm">
                        Create an account to start selling on Shobai and reach millions of customers
                        across Bangladesh. Join our growing community of successful merchants.
                     </p>
                  </div>

                  <MerchantForm />
               </div>
            </section>

            {/* Journey Section */}
            <section className="bg-card py-16 md:mt-24 lg:mt-0">
               <div className="container mx-auto px-4">
                  <div className="mb-12 text-center">
                     <h2 className="text-foreground text-4xl font-extrabold">
                        <span className="text-primary">Your Journey</span> on Shobai
                     </h2>
                     <p className="text-muted-foreground mt-4 text-lg">
                        Starting your online business with Shobai is easy. Join thousands of sellers
                        who trust Shobai with their business
                     </p>
                  </div>

                  <div className="grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-8">
                     {journeySteps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center">
                           <div className="relative mx-auto mb-4 w-full max-w-[200px] overflow-hidden rounded-lg">
                              <Image
                                 src={step.imageUrl}
                                 alt={step.title}
                                 width={200}
                                 height={272}
                                 className="h-auto w-full object-contain"
                              />
                           </div>

                           <h3 className="mb-2 text-lg font-semibold sm:text-xl">{step.title}</h3>
                           <p className="text-muted-foreground mx-auto max-w-[250px] text-sm lg:text-base">
                              {step.description}
                           </p>
                        </div>
                     ))}
                  </div>
               </div>
            </section>
         </main>

         {/* Footer Section */}
         <footer className="border-t py-8">
            <div className="box-container mx-auto px-4">
               <div className="grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] gap-4 sm:gap-8">
                  <div className="col-span-full flex flex-col gap-4 md:col-span-1">
                     <Image
                        src="/images/Logo.svg"
                        alt="Logo"
                        width={105}
                        height={20}
                        className="h-5"
                     />
                     <p className="text-muted-foreground text-sm">
                        Shobai is Bangladesh&apos;s largest online marketplace, empowering thousands
                        of merchants to reach millions of customers.
                     </p>
                  </div>

                  <div>
                     <h3 className="mb-4 text-sm font-semibold">Quick Links</h3>
                     <ul className="text-muted-foreground space-y-2 text-sm">
                        <li>
                           <span className="cursor-pointer hover:underline">About Us</span>
                        </li>
                        <li>
                           <span className="cursor-pointer hover:underline">Careers</span>
                        </li>
                        <li>
                           <span className="cursor-pointer hover:underline">Blog</span>
                        </li>
                        <li>
                           <span className="cursor-pointer hover:underline">
                              Terms & Conditions
                           </span>
                        </li>
                        <li>
                           <span className="cursor-pointer hover:underline">Privacy Policy</span>
                        </li>
                     </ul>
                  </div>

                  <div>
                     <h3 className="mb-4 text-sm font-semibold">For Merchants</h3>
                     <ul className="text-muted-foreground space-y-2 text-sm">
                        <li>
                           <span className="cursor-pointer hover:underline">Start Selling</span>
                        </li>
                        <li>
                           <span className="cursor-pointer hover:underline">Learning Center</span>
                        </li>
                        <li>
                           <span className="cursor-pointer hover:underline">Fees & Payments</span>
                        </li>
                        <li>
                           <span className="cursor-pointer hover:underline">Seller Support</span>
                        </li>
                     </ul>
                  </div>

                  <div className="col-span-full sm:col-span-1">
                     <h3 className="mb-4 text-sm font-semibold">Contact Us</h3>
                     <div className="text-muted-foreground space-y-2 text-sm">
                        <p>
                           Email:{" "}
                           <a href="mailto:support@shobai.com" className="hover:underline">
                              support@shobai.com
                           </a>
                        </p>
                        <p>
                           Phone:{" "}
                           <a href="tel:+8801234567890" className="hover:underline">
                              +880 1234-567890
                           </a>
                        </p>
                        <p>
                           Address:{" "}
                           <a
                              href="https://maps.google.com/?q=UAP+Farmgate+Campus,+74/A+Green+Road,+Farmgate,+Dhaka+1215"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline"
                           >
                              74/A Green Road, Farmgate, Dhaka 1215
                           </a>
                        </p>
                     </div>
                  </div>
               </div>

               <div className="mt-8 flex flex-col items-center justify-center gap-4 border-t pt-8 text-center">
                  <p className="text-muted-foreground text-sm">
                     Have questions? Contact us at{" "}
                     <a href="mailto:support@shobai.com" className="text-primary hover:underline">
                        support@shobai.com
                     </a>
                  </p>
                  <p className="text-muted-foreground text-sm">
                     © {new Date().getFullYear()} Shobai. All rights reserved.
                  </p>
               </div>
            </div>
         </footer>
      </div>
   );
}
