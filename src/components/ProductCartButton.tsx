"use client";

import React from "react";
import { Heart } from "@/icons";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToggleWishlistItem } from "@/hooks/wishlist";
import { useAddProductToCart } from "@/hooks/cart";

export function WishlistButton({ productId }: { productId: string }) {
   const { mutate: toggleWishlistItem } = useToggleWishlistItem();

   return (
      <Button
         data-testid="toggle-wishlist-button"
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
   const { mutate: addProductToCart } = useAddProductToCart();

   return (
      <Button
         data-testid="add-to-cart-button"
         onClick={() => addProductToCart(productId)}
         variant="ghost"
         className="text-foreground flex flex-shrink-0 items-center gap-x-1 rounded-full bg-white/75 p-3 py-2 text-sm backdrop-blur-sm"
      >
         <ShoppingCart className="size-4" />
      </Button>
   );
}
