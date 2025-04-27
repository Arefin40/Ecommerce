"use client";

import React from "react";
import { toggleLikePost } from "@/actions/social";
import { Heart } from "lucide-react";

interface PostLikeButtonProps {
   postId: string;
   isLiked: boolean;
}

function PostLikeButton({ postId, isLiked = false }: PostLikeButtonProps) {
   const toggleLike = async (postId: string) => {
      await toggleLikePost(postId);
   };

   return (
      <button onClick={() => toggleLike(postId)} className="transition-transform active:scale-125">
         {isLiked ? (
            <Heart className="h-5 w-5 fill-rose-400 text-rose-400" />
         ) : (
            <Heart className="h-5 w-5 text-gray-500" />
         )}
      </button>
   );
}

export default PostLikeButton;
