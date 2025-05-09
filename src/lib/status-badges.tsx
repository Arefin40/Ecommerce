export function getStatusBadge(
   status:
      | "pending"
      | "confirmed"
      | "processing"
      | "shipped"
      | "out_for_delivery"
      | "delivered"
      | "cancelled"
      | "returned"
) {
   const baseClasses = "text-xs font-medium px-2 py-1 rounded-full";
   switch (status) {
      case "processing":
         return <span className={`${baseClasses} bg-blue-100 text-blue-800`}>Processing</span>;
      case "shipped":
         return <span className={`${baseClasses} bg-green-100 text-green-800`}>Shipped</span>;
      case "delivered":
         return <span className={`${baseClasses} bg-purple-100 text-purple-800`}>Delivered</span>;
      case "cancelled":
         return <span className={`${baseClasses} bg-red-100 text-red-800`}>Cancelled</span>;
      case "confirmed":
         return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>Confirmed</span>;
      case "out_for_delivery":
         return (
            <span className={`${baseClasses} bg-orange-100 text-orange-800`}>Out for Delivery</span>
         );
      case "returned":
         return <span className={`${baseClasses} bg-pink-100 text-pink-800`}>Returned</span>;
      default:
         return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>Pending</span>;
   }
}

export function getPaymentStatusBadge(isPaid: boolean) {
   const baseClasses = "text-xs font-medium px-2 py-1 rounded-full";
   return isPaid ? (
      <span className={`${baseClasses} bg-green-100 text-green-800`}>Paid</span>
   ) : (
      <span className={`${baseClasses} bg-red-100 text-red-800`}>Unpaid</span>
   );
}
