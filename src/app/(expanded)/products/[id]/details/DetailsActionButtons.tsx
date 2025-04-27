"use client";

import React from "react";
import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { addToCart, toggleWishlistItem } from "@/actions/checkout";

function DetailsActionButtons({ productId }: { productId: string }) {
   const handleAddToCart = async () => {
      const response = await addToCart(productId, 1);
      if (response.success) {
         toast.success(response.message ?? "Product added to cart");
      }
   };

   const handleAddToWishlist = async () => {
      const response = await toggleWishlistItem(productId);
      if (response.success) {
         toast.success(response.message ?? "Product added to wishlist");
      }
   };

   return (
      <div className="inline-flex items-center justify-start gap-3">
         <Button
            onClick={handleAddToCart}
            className="bg-primary hover:bg-primary/90 h-12 w-48 flex-1 gap-2 rounded-full px-8 py-3 text-base font-semibold"
         >
            <ShoppingCart className="h-5 w-5" />
            Add to Cart
         </Button>

         <Button
            onClick={handleAddToWishlist}
            variant="outline"
            className="h-12 w-48 flex-1 gap-2 rounded-full px-8 py-3 text-base font-semibold"
         >
            <Heart className="h-5 w-5" />
            Wishlist
         </Button>
      </div>
   );
}

export default DetailsActionButtons;
