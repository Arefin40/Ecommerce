"use client";

import React from "react";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteProduct } from "@/actions/products";
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

function DeleteProductButton({ productId }: { productId: string }) {
   const router = useRouter();
   const [isLoading, setIsLoading] = React.useState(false);
   const [isOpen, setIsOpen] = React.useState(false);

   const handleDelete = async () => {
      setIsLoading(true);
      await deleteProduct(productId);
      setIsLoading(false);
      router.push("/manage-inventory");
   };

   return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
         <DialogTrigger asChild data-testid="delete-product-button">
            <Button
               size="icon"
               className="text-muted-foreground bg-muted flex-center hover:text-foreground group hover:bg-muted group size-9 rounded-full transition-colors"
            >
               <Trash className="group-hover:text-destructive size-5" />
            </Button>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Are you sure?</DialogTitle>
               <DialogDescription>
                  This action cannot be undone. This will permanently delete the product.
               </DialogDescription>
            </DialogHeader>
            <DialogFooter>
               <Button
                  data-testid="cancel-button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
               >
                  Cancel
               </Button>
               <Button
                  data-testid="delete-button"
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={isLoading}
               >
                  {isLoading ? "Deleting..." : "Delete"}
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}

export default DeleteProductButton;
