import toast from "react-hot-toast";
import type { CartDetails, CartItem } from "@/types/Cart";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import {
   getCartItems,
   getCartDetails,
   addToCart,
   updateCartItemQuantity,
   clearCart,
   deleteCartItem
} from "@/actions/cart";

export function useCartItems() {
   return useQuery<CartItem[]>({
      queryKey: ["cart"],
      queryFn: async () => {
         const { success, data = [] } = await getCartItems();
         if (!success || !data) return [];
         return data as CartItem[];
      }
   });
}

export function useCartDetails() {
   return useQuery<CartDetails>({
      queryKey: ["cartDetails"],
      queryFn: async () => {
         const { success, data } = await getCartDetails();
         if (!success || !data) return { totalPrice: "0", totalQuantity: 0 };
         return data;
      }
   });
}

export function useAddProductToCart() {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: async (productId: string) => {
         const result = await addToCart(productId);
         if (!result.success && result.error) toast.error(result.error);
         toast.success("Added to cart");
         return { success: true, message: "Product added to cart" };
      },
      onError: (err) => {
         console.error(err);
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ["cart"] });
         queryClient.invalidateQueries({ queryKey: ["cartDetails"] });
      }
   });
}

export function useUpdateCart() {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: async ({ productId, quantity }: { productId: string; quantity: number }) => {
         const result = await updateCartItemQuantity(productId, quantity);
         return result;
      },

      onMutate: async (updatedCartItem) => {
         // Cancel any outgoing refetches
         await queryClient.cancelQueries({ queryKey: ["cart"] });
         await queryClient.cancelQueries({ queryKey: ["cartDetails"] });

         // Snapshot the previous value
         const previousCartData = queryClient.getQueryData<CartItem[]>(["cart"]);
         const previousCartDetails = queryClient.getQueryData<CartDetails>(["cartDetails"]);
         const newDetails = previousCartDetails;

         // Optimistically update to the new value
         queryClient.setQueryData(["cart"], (old: CartItem[] | undefined) => {
            if (!old) return [];

            return old.map((item) => {
               if (item.product?.id === updatedCartItem.productId) {
                  if (newDetails && item.product) {
                     const quantityDifference = updatedCartItem.quantity - item.quantity;
                     newDetails.totalQuantity += quantityDifference;
                     newDetails.totalPrice = (
                        parseFloat(newDetails.totalPrice) +
                        item.product.price * quantityDifference
                     ).toFixed(2);
                  }
                  return { ...item, quantity: updatedCartItem.quantity };
               } else {
                  return item;
               }
            });
         });
         queryClient.setQueryData(["cartDetails"], () => {
            if (newDetails) return newDetails;
            return { totalPrice: "0", totalQuantity: 0 };
         });

         // Return a context object with the snapshotted value
         return {
            previousCartData: previousCartData ? previousCartData : [],
            previousCartDetails: previousCartDetails
               ? previousCartDetails
               : { totalPrice: "0", totalQuantity: 0 }
         };
      },

      onError: (err, updatedCart, context) => {
         if (context?.previousCartData) {
            queryClient.setQueryData(["cart"], context.previousCartData);
         }
         if (context?.previousCartDetails) {
            queryClient.setQueryData(["cartDetails"], context.previousCartDetails);
         }
      },

      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ["cart"] });
         queryClient.invalidateQueries({ queryKey: ["cartDetails"] });
      }
   });
}

export function useDeleteCartItem() {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: async (productId: string) => {
         const result = await deleteCartItem(productId);
         if (!result.success && result.error) toast.error(result.error);
         return result;
      },

      onMutate: async (productId: string) => {
         await queryClient.cancelQueries({ queryKey: ["cart"] });
         await queryClient.cancelQueries({ queryKey: ["cartDetails"] });

         const previousCartData = queryClient.getQueryData<CartItem[]>(["cart"]);
         const previousCartDetails = queryClient.getQueryData<CartDetails>(["cartDetails"]);
         const newDetails = previousCartDetails;

         queryClient.setQueryData(["cart"], (old: CartItem[] | undefined) => {
            if (!old) return [];
            const newData = old.filter((item) => item.product?.id !== productId);
            const calculatedDetails = calculateDetails(newData);
            if (newDetails) {
               newDetails.totalQuantity = calculatedDetails.totalQuantity;
               newDetails.totalPrice = calculatedDetails.totalPrice.toFixed(2);
            }
            newDetails;
            return newData;
         });
         queryClient.setQueryData(["cartDetails"], () => {
            if (newDetails) return newDetails;
            return { totalPrice: "0", totalQuantity: 0 };
         });

         return {
            previousCartData: previousCartData ? previousCartData : [],
            previousCartDetails: previousCartDetails
               ? previousCartDetails
               : { totalPrice: "0", totalQuantity: 0 }
         };
      },

      onError: (err, updatedCart, context) => {
         if (context?.previousCartData) {
            queryClient.setQueryData(["cart"], context.previousCartData);
         }
         if (context?.previousCartData) {
            queryClient.setQueryData(["cart"], context.previousCartData);
         }
      },

      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ["cart"] });
         queryClient.invalidateQueries({ queryKey: ["cartDetails"] });
      }
   });
}

export function useClearCart() {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: clearCart,
      onMutate: async () => {
         await queryClient.cancelQueries({ queryKey: ["cart"] });
         await queryClient.cancelQueries({ queryKey: ["cartDetails"] });

         const previousCartData = queryClient.getQueryData<CartItem[]>(["cart"]);
         const previousCartDetails = queryClient.getQueryData<CartDetails>(["cartDetails"]);

         queryClient.setQueryData(["cart"], () => []);
         queryClient.setQueryData(["cartDetails"], () => ({ totalQuantity: 0, totalPrice: "0" }));

         return {
            previousCartData: previousCartData ? previousCartData : [],
            previousCartDetails: previousCartDetails
               ? previousCartDetails
               : { totalPrice: "0", totalQuantity: 0 }
         };
      },

      onError: (err, updatedCart, context) => {
         if (context?.previousCartData) {
            queryClient.setQueryData(["cart"], context.previousCartData);
         }
         if (context?.previousCartDetails) {
            queryClient.setQueryData(["cartDetails"], context.previousCartDetails);
         }
      },

      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ["cart"] });
         queryClient.invalidateQueries({ queryKey: ["cartDetails"] });
      }
   });
}

function calculateDetails(cartItems: CartItem[]) {
   if (!cartItems || cartItems.length === 0) return { totalPrice: 0, totalQuantity: 0 };
   return cartItems.reduce(
      (acc: { totalPrice: number; totalQuantity: number }, item) => {
         return {
            totalPrice: acc.totalPrice + (item?.product?.price || 0) * item.quantity,
            totalQuantity: acc.totalQuantity + item.quantity
         };
      },
      { totalPrice: 0, totalQuantity: 0 }
   );
}
