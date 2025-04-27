import React from "react";
import Image from "next/image";
import { StoreLogo, StoreProduct } from "@/icons";
import { cn } from "@/lib/utils";

interface StorePreviewProps {
   storeName: string;
   storeSlug: string;
   storeCover: string | null;
   storeLogo: string | null;
}

function StorePreview({ storeName, storeSlug, storeCover, storeLogo }: StorePreviewProps) {
   return (
      <div className="scrollbar-hide w-full space-y-5 overflow-y-auto p-6">
         <div className="w-full rounded-lg">
            <div className="relative w-full overflow-hidden rounded-t-lg bg-[#EAE9E5]">
               <Image
                  src={storeCover || "/images/StoreCover.svg"}
                  alt="Store cover"
                  width={1600}
                  height={900}
                  className={cn("h-auto w-full object-cover", {
                     "aspect-auto": storeCover,
                     "aspect-[3/1]": !storeCover
                  })}
               />
            </div>

            <header className="rounded-b-md border border-t-0 pl-6">
               <div className="flex items-end gap-x-6">
                  {/* <!-- Logo --> */}
                  <div className="relative w-40 flex-shrink-0">
                     <div className="absolute bottom-0 left-0 z-10 size-40 flex-shrink-0 rounded-full bg-white p-1">
                        <div className="flex-center relative size-full overflow-hidden rounded-full border-2 border-stone-200 bg-[#f0f0f0]">
                           <StoreLogo className="size-20" />
                           {storeLogo && (
                              <Image
                                 src={storeLogo}
                                 width="256"
                                 height="256"
                                 alt="Store logo preview"
                                 className="store-logo-preview absolute h-full w-full object-cover"
                              />
                           )}
                        </div>
                     </div>
                  </div>

                  {/* <!-- Info --> */}
                  <div className="flex w-full items-center py-6 leading-none">
                     <div className="flex flex-col">
                        <h2 id="store-name-preview" className="text-foreground text-2xl font-bold">
                           {storeName}
                        </h2>
                        <div className="flex items-center gap-x-2">
                           <p className="text-foreground">
                              @<span id="store-slug-preview">{storeSlug}</span>
                           </p>
                           <span className="size-1.5 flex-shrink-0 rounded-full bg-gray-300"></span>
                           <p>
                              <span className="text-foreground font-semibold">12K</span>
                              <span>Followers</span>
                           </p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="mt-2 flex items-center justify-between gap-x-6 border-t px-3 py-2">
                  <nav className="flex items-center gap-x-8">
                     <p className="text-foreground cursor-pointer">Home</p>
                     <p className="cursor-pointer text-gray-600">Collections</p>
                     <p className="cursor-pointer text-gray-600">About</p>
                  </nav>
                  <button className="bg-primary rounded-lg px-4 py-2 font-semibold text-white">
                     Follow
                  </button>
               </div>
            </header>
         </div>

         <main className="space-y-6 rounded-lg bg-gray-100 p-2">
            <div className="space-y-4 rounded-md bg-white p-4 text-lg font-semibold">
               <h2 className="text text-foreground font-bold">Collection Name</h2>

               <main className="grid grid-cols-4 gap-x-5 text-sm">
                  {Array.from({ length: 4 }).map((_, index) => (
                     <div
                        key={index}
                        className="flex-center relative aspect-[1/1.25] overflow-hidden rounded-lg bg-[#EAE9E5]"
                     >
                        <StoreProduct className="size-full" />
                        <div className="from-foreground/40 absolute inset-x-0 bottom-0 bg-gradient-to-t to-transparent p-3 text-sm">
                           <h1 className="text-base font-semibold text-white">Product Name</h1>
                           <p className="text-sm text-white">BDT 1000</p>
                        </div>
                     </div>
                  ))}
               </main>
            </div>
         </main>
      </div>
   );
}

export default StorePreview;
