"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { deletePost } from "@/actions/social";
import { useRouter } from "next/navigation";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger
} from "@/components/ui/dialog";

function PostAction({ postId }: { postId: string }) {
   const [isLoading, setIsLoading] = React.useState(false);
   const [isOpen, setIsOpen] = React.useState(false);
   const router = useRouter();

   const handleDelete = async () => {
      setIsLoading(true);
      await deletePost(postId);
      setIsLoading(false);
      router.push("/manage-posts");
   };

   return (
      <div className="flex items-center justify-center gap-3">
         <Link
            href={`/posts/${postId}/update`}
            className="bg-muted flex-center text-muted-foreground hover:text-foreground size-9 rounded-full"
         >
            <Pencil className="size-4" />
         </Link>

         <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
               <Button
                  variant="ghost"
                  size="icon"
                  className="bg-muted flex-center text-muted-foreground hover:text-foreground size-9 rounded-full"
               >
                  <Trash className="size-4" />
               </Button>
            </DialogTrigger>
            <DialogContent>
               <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                  <DialogDescription>
                     This action cannot be undone. This will permanently delete the post.
                  </DialogDescription>
               </DialogHeader>
               <DialogFooter>
                  <Button variant="outline" onClick={() => setIsOpen(false)}>
                     Cancel
                  </Button>
                  <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
                     {isLoading ? "Deleting..." : "Delete"}
                  </Button>
               </DialogFooter>
            </DialogContent>
         </Dialog>
      </div>
   );
}

export default PostAction;
