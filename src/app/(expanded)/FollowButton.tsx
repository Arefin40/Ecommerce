"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { toggleFollowStore } from "@/actions/store";
import { cn } from "@/lib/utils";

interface FollowButtonProps {
   storeId: string;
   isFollowed: boolean;
}

export default function FollowButton({ storeId, isFollowed = false }: FollowButtonProps) {
   const toggleFollow = async (storeId: string) => {
      await toggleFollowStore(storeId, "/");
   };

   return (
      <Button
         onClick={() => toggleFollow(storeId)}
         size="sm"
         className={cn(
            "rounded-full py-4 text-sm",
            isFollowed
               ? "bg-gray-200 text-gray-600 hover:bg-gray-200/90"
               : "bg-primary text-primary-foreground hover:bg-primary/90"
         )}
      >
         {isFollowed ? "Following" : "Follow"}
      </Button>
   );
}
