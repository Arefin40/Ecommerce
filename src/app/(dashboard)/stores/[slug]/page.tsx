import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getStore } from "@/actions/store";

async function StoreFront({ params }: { params: Promise<{ slug: string }> }) {
   const { slug } = await params;
   const { data: store } = await getStore(slug);
   if (!store) return null;

   return (
      <div className="shadow-card scroll-hide col-span-1 col-start-2 flex-1 space-y-3 overflow-y-auto rounded-lg bg-white p-3">
         {/* Store front */}
         <section className="rounded-lg border border-gray-200">
            <div className="aspect-[3/1] w-full overflow-hidden rounded-t-lg bg-[#EAE9E5]">
               <Image
                  src={store.cover || "/placeholder-cover.jpg"}
                  alt="Store cover"
                  width={1280}
                  height={720}
                  className="h-full w-full object-cover object-top"
               />
            </div>

            <div className="rounded-md px-4">
               <div className="flex items-end gap-x-8">
                  {/* Logo */}
                  <div className="relative w-48 flex-shrink-0">
                     <div className="absolute inset-x-0 bottom-0 aspect-[1/1] overflow-hidden rounded-full bg-white p-1">
                        <Image
                           src={store.logo || "/placeholder-logo.jpg"}
                           alt="Store logo"
                           width={256}
                           height={256}
                           className="rounded-full border border-gray-200 object-cover"
                        />
                     </div>
                  </div>

                  {/* Info */}
                  <div className="flex w-full items-center justify-between gap-x-8 py-10 leading-none">
                     <div className="flex flex-col gap-y-1.5">
                        <h2 className="text-foreground text-2xl font-bold">{store.name}</h2>
                        <div className="flex items-center gap-x-2">
                           <p className="text-foreground">@{store.slug}</p>
                           <span className="size-1.5 flex-shrink-0 rounded-full bg-gray-300"></span>
                           <p>
                              <span className="text-foreground font-semibold">0</span>
                              <span> Followers</span>
                           </p>
                        </div>
                     </div>

                     <Button
                        variant="default"
                        className="rounded-full px-5 py-2 text-lg font-semibold"
                     >
                        Follow
                     </Button>
                  </div>
               </div>
            </div>
         </section>

         {/* Store content */}
         <main className="space-y-6 rounded-lg">
            <div className="space-y-4 rounded-md border border-gray-100 bg-white p-4 text-lg font-semibold">
               <h2 className="text text-foreground font-bold">Products</h2>
               {store.products.length === 0 ? (
                  <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
                     <p className="text-muted-foreground text-base font-normal">
                        No products yet. Start adding products to your store!
                     </p>
                     <Link
                        href="/products/create"
                        className="text-primary hover:text-primary/90 text-base font-medium"
                     >
                        Create your first product
                     </Link>
                  </div>
               ) : (
                  <main className="grid grid-cols-4 gap-x-5 text-sm">
                     {store.products.map((product) => (
                        <div
                           key={product.id}
                           className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
                        >
                           <div className="relative aspect-square bg-gray-200">
                              <Image
                                 fill
                                 src={product.image || "/placeholder-product.jpg"}
                                 alt={product.name}
                                 className="object-cover object-top"
                              />
                           </div>
                           <div className="flex flex-1 flex-col space-y-2 p-4">
                              <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                              <div className="flex flex-1 flex-col justify-end">
                                 <p className="text-base font-medium text-gray-900">
                                    ${product.price?.toFixed(2)}
                                 </p>
                              </div>
                           </div>
                        </div>
                     ))}
                  </main>
               )}
            </div>
         </main>
      </div>
   );
}

export default StoreFront;
