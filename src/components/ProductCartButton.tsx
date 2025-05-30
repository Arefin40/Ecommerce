"use client";

import React from "react";
import toast from "react-hot-toast";
import { Heart } from "@/icons";
import { ShoppingCart } from "lucide-react";
import { addToCart } from "@/actions/cart";
import { Button } from "@/components/ui/button";
import { useToggleWishlistItem } from "@/hooks/wishlist";

export function WishlistButton({ productId }: { productId: string }) {
   const { mutate: toggleWishlistItem } = useToggleWishlistItem();

   return (
      <Button
         onClick={() => toggleWishlistItem(productId)}
         size="icon"
         variant="ghost"
         className="text-foreground flex flex-shrink-0 items-center gap-x-1 rounded-full bg-white/75 p-3 py-2 text-sm backdrop-blur-sm"
      >
         <Heart className="text-foreground size-4" />
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
