"use client";

import { cn } from "@/lib/utils";
import { Heart } from "@/icons";
import { useWishlistItems, useClearWishlist } from "@/hooks/wishlist";
import ProductCard from "@/components/ProductCard";
import EmptyWishlist from "@/icons/EmptyWishlist";

export default function WishlistPage() {
   const { data: wishlistItems = [], isLoading } = useWishlistItems();
   const { mutate: clearWishlist } = useClearWishlist();

   if (isLoading) return <LoadingSkeleton />;
   if (wishlistItems.length === 0) return <EmptyState />;

   return (
      <section className="shadow-card relative col-span-1 col-start-2 flex h-full flex-col space-y-6 overflow-hidden rounded-lg bg-white px-10 py-6 pt-20">
         <main className="mx-auto w-full max-w-6xl flex-1 overflow-hidden">
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
                     onClick={() => clearWishlist()}
                     className="hover:text-primary transition-colors"
                  >
                     Clear All
                  </button>
               </div>
            </header>

            <div
               className={cn(
                  "scroll-hide grid h-full items-start gap-4 overflow-y-auto pt-4",
                  wishlistItems.length > 3
                     ? "grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]"
                     : "md:grid-cols-3 xl:grid-cols-4"
               )}
            >
               {wishlistItems.map((product) => (
                  <ProductCard key={product.id} product={product} />
               ))}
            </div>
         </main>
      </section>
   );
}

function LoadingSkeleton() {
   return (
      <section
         className="shadow-card relative col-span-1 col-start-2 flex h-full flex-col space-y-6 overflow-hidden rounded-lg bg-white px-10 py-6 pt-20"
      >
         <main className="mx-auto w-full max-w-6xl flex-1 overflow-hidden">
            <header className="flex items-center justify-between pb-2">
               <div className="h-8 w-32 animate-pulse rounded bg-gray-200" />
               <div className="flex items-center gap-4">
                  <div className="h-6 w-20 animate-pulse rounded bg-gray-200" />
                  <div className="h-8 w-[1px] bg-gray-200"></div>
                  <div className="h-6 w-20 animate-pulse rounded bg-gray-200" />
               </div>
            </header>

            <div className="scroll-hide grid h-full grid-cols-2 items-start gap-4 overflow-y-auto pt-4 md:grid-cols-3 lg:grid-cols-4">
               {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-3">
                     <div className="aspect-square w-full animate-pulse rounded-lg bg-gray-200" />
                     <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
                     <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
                  </div>
               ))}
            </div>
         </main>
      </section>
   );
}

function EmptyState() {
   return (
      <section className="flex-center h-full pt-20">
         <div className="flex-center flex-1 flex-col">
            <EmptyWishlist className="mx-auto w-full max-w-md" />
            <div className="space-y-1">
               <p className="text-foreground text-center text-2xl leading-relaxed font-semibold tracking-tight">
                  No items in your wishlist yet
               </p>
               <div className="text-muted-foreground flex items-center gap-x-1.5 text-lg font-normal">
                  <span>Save items you love by clicking the</span>
                  <Heart isLiked className="-mb-1 size-4" />
                  <span>icon</span>
               </div>
            </div>
         </div>
      </section>
   );
}
