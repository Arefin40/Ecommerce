"use client";

import React from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";

import { toggleWishlistItem, addToCart } from "@/actions/checkout";

export function WishlistButton({ productId }: { productId: string }) {
   const toggleWishlist = async () => {
      const { success } = await toggleWishlistItem(productId);
      if (success) toast.success("Wishlist updated");
   };

   return (
      <Button
         onClick={toggleWishlist}
         size="icon"
         variant="ghost"
         className="absolute top-3 right-3 z-10 aspect-square size-9 rounded-full bg-white/75 backdrop-blur-sm"
      >
         <Heart className="text-muted-foreground size-5" />
      </Button>
   );
}

export function AddToCartButton({ productId }: { productId: string }) {
   const handleAddToCart = async () => {
      const { success } = await addToCart(productId);
      if (success) toast.success("Added to cart");
   };

   return (
      <Button
         onClick={handleAddToCart}
         variant="ghost"
         className="text-foreground flex flex-shrink-0 items-center gap-x-1 rounded-full bg-white/75 p-3 py-2 text-sm backdrop-blur-sm"
      >
         <ShoppingCart className="size-4" />
      </Button>
   );
}
