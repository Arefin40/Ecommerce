import toast from "react-hot-toast";
import type { WishlistItem } from "@/types/Wishlist";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { clearWishlist, getWishlistItems, toggleWishlistItem } from "@/actions/wishlist";

export function useWishlistItems() {
   return useQuery({
      queryKey: ["wishlist"],
      queryFn: async () => {
         const { success, data } = await getWishlistItems();
         if (!success || !data) return [];
         return data;
      }
   });
}

export function useToggleWishlistItem() {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: async (productId: string) => {
         const result = await toggleWishlistItem(productId);
         if (!result.success && result.error) toast.error(result.error);
         toast.success(result.action === "added" ? "Added to wishlist" : "Removed from wishlist");
         return result;
      },
      onError: (err) => {
         console.error(err);
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      }
   });
}

export function useClearWishlist() {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: clearWishlist,
      onMutate: async () => {
         await queryClient.cancelQueries({ queryKey: ["wishlist"] });
         const previousWishlistData = queryClient.getQueryData<WishlistItem[]>(["wishlist"]);
         queryClient.setQueryData(["wishlist"], () => []);
         return { previousWishlistData: previousWishlistData ? previousWishlistData : [] };
      },
      onError: (err, updatedWishlist, context) => {
         if (context?.previousWishlistData) {
            queryClient.setQueryData(["wishlist"], context.previousWishlistData);
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      }
   });
}
