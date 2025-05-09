import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/actions/orders";

export function useOrders() {
   return useQuery({
      queryKey: ["orders"],
      queryFn: async () => {
         const { success, data } = await getOrders();
         if (!success) return [];
         return data;
      }
   });
}
