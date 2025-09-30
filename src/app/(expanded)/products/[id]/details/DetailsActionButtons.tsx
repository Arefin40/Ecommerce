"use client";

import React from "react";
import { Heart } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToggleWishlistItem } from "@/hooks/wishlist";
import { useAddProductToCart } from "@/hooks/cart";

function DetailsActionButtons({ productId }: { productId: string }) {
   const { mutate: addProductToCart } = useAddProductToCart();
   const { mutate: toggleWishlistItem } = useToggleWishlistItem();

   return (
      <div className="inline-flex items-center justify-start gap-3">
         <Button
            onClick={() => addProductToCart(productId)}
            data-testid="add-to-cart-button"
            className="bg-primary hover:bg-primary/90 h-12 w-48 flex-1 gap-2 rounded-full px-8 py-3 text-base font-semibold"
         >
            <ShoppingCart className="h-5 w-5" />
            Add to Cart
         </Button>

         <Button
            onClick={() => toggleWishlistItem(productId)}
            variant="outline"
            data-testid="add-to-wishlist-button"
            className="h-12 w-48 flex-1 gap-2 rounded-full px-8 py-3 text-base font-semibold"
         >
            <Heart className="h-5 w-5" />
            Wishlist
         </Button>
      </div>
   );
}

export default DetailsActionButtons;
