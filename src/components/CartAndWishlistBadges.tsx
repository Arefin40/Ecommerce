"use client";

import React from "react";
import { useCartDetails } from "@/hooks/cart";
import { useWishlistDetails } from "@/hooks/wishlist";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function CartBadge() {
   const { data: cartDetails } = useCartDetails();
   return (
      <motion.span
         key={cartDetails?.totalQuantity}
         initial={{ scale: 0 }}
         animate={{ scale: 1 }}
         transition={{ type: "spring", stiffness: 500, damping: 15 }}
         className={cn(
            "bg-primary pointer-events-none absolute -top-2 -right-2.5 min-w-[1.375rem] rounded-full px-1 py-0.5 text-xs text-white shadow",
            !cartDetails?.totalQuantity ? "hidden" : "flex-center"
         )}
      >
         {cartDetails?.totalQuantity || 0}
      </motion.span>
   );
}

export function WishlistBadge() {
   const { data: wishlistDetails } = useWishlistDetails();
   return (
      <motion.span
         key={wishlistDetails?.count}
         initial={{ scale: 0 }}
         animate={{ scale: 1 }}
         transition={{ type: "spring", stiffness: 500, damping: 15 }}
         className={cn(
            "bg-primary pointer-events-none absolute -top-2 -right-2.5 min-w-[1.375rem] rounded-full px-1 py-0.5 text-xs text-white shadow",
            !wishlistDetails?.count ? "hidden" : "flex-center"
         )}
      >
         {wishlistDetails?.count || 0}
      </motion.span>
   );
}
