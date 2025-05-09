"use client";

import EmptyWishlist from "@/icons/EmptyWishlist";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { clearWishlist, getWishlistItems, toggleWishlistItem } from "@/actions/wishlist";

interface WishlistItem {
   user: string;
   product: {
      id: string;
      name: string;
      price: number;
      image: string | null;
   } | null;
}

export default function WishlistPage() {
   const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
   const [toggle, setToggle] = useState(false);

   const handleToggleWishlistItem = async (productId: string) => {
      if (productId === "") return;
      await toggleWishlistItem(productId);
      setToggle((prev) => !prev);
   };

   const handleClearWishlist = async () => {
      await clearWishlist();
      setToggle((prev) => !prev);
   };

   useEffect(() => {
      const fetchWishlistItems = async () => {
         const { success, data } = await getWishlistItems();
         if (success && data) setWishlistItems(data);
      };

      fetchWishlistItems();
   }, [toggle]);

   return (
      <section className="shadow-card relative col-span-1 col-start-2 flex h-full flex-col space-y-6 overflow-hidden rounded-lg bg-white px-10 py-6 pt-20">
         <main className="mx-auto w-full max-w-6xl">
            <header className="flex items-center justify-between pb-2">
               <h1 className="text-foreground text-2xl font-bold">Wishlist</h1>
               <div className="flex items-center gap-4">
                  <p className="space-x-1.5">
                     <span className="text-foreground font-semibold">
                        {wishlistItems.length || 0}
                     </span>
                     <span>items</span>
                  </p>
                  <div className="h-8 w-[1px] bg-gray-200"></div>
                  <button
                     onClick={handleClearWishlist}
                     className="hover:text-primary transition-colors"
                  >
                     Clear All
                  </button>
               </div>
            </header>

            {wishlistItems.length > 0 ? (
               <div className="border-border mt-6 overflow-hidden rounded-md border">
                  <table className="min-w-full border-collapse bg-white">
                     <thead className="bg-accent">
                        <tr>
                           <th className="text-muted-foreground px-4 py-3 text-left text-sm font-semibold">
                              Product
                           </th>
                           <th className="text-muted-foreground px-4 py-3 text-left text-sm font-semibold">
                              Price
                           </th>
                           <th className="text-muted-foreground px-4 py-3 text-right text-sm font-semibold">
                              Action
                           </th>
                        </tr>
                     </thead>
                     <tbody>
                        {wishlistItems.map((item) => (
                           <tr key={item.product?.id}>
                              <td className="px-4 py-2 text-sm">
                                 <div className="flex items-center gap-x-4">
                                    <Image
                                       src={item.product?.image || "/placeholder.svg"}
                                       alt={item.product?.name || "Product"}
                                       width={48}
                                       height={48}
                                       className="rounded-md"
                                    />
                                    <p className="text-sm font-medium">{item.product?.name}</p>
                                 </div>
                              </td>
                              <td className="px-4 py-2 text-sm">{item.product?.price} Tk.</td>
                              <td className="px-4 py-2 text-sm">
                                 <div className="flex h-full items-center justify-end">
                                    <Button
                                       onClick={() =>
                                          handleToggleWishlistItem(item.product?.id || "")
                                       }
                                       size="icon"
                                       variant="ghost"
                                       className="bg-muted text-muted-foreground"
                                    >
                                       <Trash className="size-4" />
                                    </Button>
                                 </div>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            ) : (
               <div className="flex-center flex-1 flex-col">
                  <EmptyWishlist className="mx-auto w-full max-w-md" />
                  <p className="text-foreground text-center text-2xl leading-relaxed font-semibold tracking-tight">
                     No items in your wishlist yet
                     <span className="text-muted-foreground mt-1 block text-lg font-normal">
                        Save items you love by clicking the 🩷 icon
                     </span>
                  </p>
               </div>
            )}
         </main>
      </section>
   );
}
