"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toggleFollowStore } from "@/actions/store";
import { cn } from "@/lib/utils";

interface FollowButtonProps {
   storeId: string;
   isFollowed: boolean;
   className?: string;
}

export default function FollowButton({
   storeId,
   isFollowed = false,
   className
}: FollowButtonProps) {
   const [optimisticFollow, setOptimisticFollow] = useState(isFollowed);
   const [isPending, setIsPending] = useState(false);

   const toggleFollow = async (storeId: string) => {
      setIsPending(true);
      setOptimisticFollow(!optimisticFollow);
      try {
      await toggleFollowStore(storeId, "/");
      } catch {
         setOptimisticFollow(isFollowed);
      } finally {
         setIsPending(false);
      }
   };

   return (
      <Button
         onClick={() => toggleFollow(storeId)}
         size="sm"
         disabled={isPending}
         className={cn(
            "rounded-full py-4 text-sm",
            optimisticFollow
               ? "text-muted-foreground bg-gray-200 hover:bg-gray-200/90"
               : "bg-primary text-primary-foreground hover:bg-primary/90",
            className
         )}
      >
         {optimisticFollow ? "Following" : "Follow"}
      </Button>
   );
}
