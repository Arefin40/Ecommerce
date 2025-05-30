"use client";

import React from "react";
import { Heart } from "@/icons";
import { cn } from "@/lib/utils";
import { toggleLikePost } from "@/actions/social";

interface PostLikeButtonProps {
   postId: string;
   isLiked: boolean;
   totalLikes?: number;
}

function PostLikeButton({ postId, totalLikes = 0, isLiked = false }: PostLikeButtonProps) {
   const [likeState, setLikeState] = React.useState({ isLiked, count: totalLikes });

   const handlePostLike = async () => {
      const currentState = likeState;
      setLikeState((prev) => ({
         isLiked: !prev.isLiked,
         count: prev.isLiked ? prev.count - 1 : prev.count + 1
      }));

      const response = await toggleLikePost(postId);
      if (!response.success) {
         setLikeState(currentState);
      }
   };

   return (
      <div className="flex items-center gap-x-2">
         <button
            onClick={handlePostLike}
            className={cn("flex-center size-7 rounded-full transition-transform active:scale-125", {
               "bg-[#F52C4B]": likeState.isLiked,
               "bg-gray-200": !likeState.isLiked
            })}
         >
            <Heart isLiked filledColor="text-white" className="size-4" />
         </button>
         <p>
            {likeState.count === 0
               ? "Be the first to like this"
               : `${likeState.count} like${likeState.count > 1 ? "s" : ""}`}
         </p>
      </div>
   );
}

export default PostLikeButton;
