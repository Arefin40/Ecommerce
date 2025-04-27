import Link from "next/link";
import Image from "next/image";
import { Pencil } from "lucide-react";
import { getAllProducts } from "@/actions/products";
import DashboardContainer from "@/components/DashboardContainer";
import DeleteProductButton from "./DeleteProductButton";

export default async function ManageInventory() {
   const products = await getAllProducts();

   return (
      <DashboardContainer
         title="Manage Inventory"
         description="Manage product stock levels, availability, variants"
         actions={
            <Link
               href="/products/create"
               className="flex-center bg-primary h-11 rounded-full px-4 text-white"
            >
               Add Product
            </Link>
         }
      >
         <div className="border-border overflow-hidden rounded-md border">
            <table className="min-w-full border-collapse bg-white">
               <thead className="bg-accent">
                  <tr>
                     <th className="text-muted-foreground px-4 py-3 text-left text-sm font-semibold">
                        Product
                     </th>
                     <th className="text-muted-foreground px-4 py-3 text-left text-sm font-semibold">
                        Price
                     </th>
                     <th className="text-muted-foreground px-4 py-3 text-left text-sm font-semibold">
                        Stock
                     </th>
                     <th className="text-muted-foreground px-4 py-3 text-left text-sm font-semibold">
                        Status
                     </th>
                     <th className="text-muted-foreground px-4 py-3 text-right text-sm font-semibold">
                        Action
                     </th>
                  </tr>
               </thead>
               <tbody>
                  {products.map((product) => (
                     <tr key={product.id}>
                        <td className="px-4 py-2 text-sm">
                           <div className="flex items-center gap-x-4">
                              <Image
                                 src={product.image || "/images/product.png"}
                                 alt={product.name}
                                 width={48}
                                 height={48}
                                 className="rounded-md"
                              />
                              <div>
                                 <p className="text-sm font-medium">{product.name}</p>
                                 <p className="text-muted-foreground text-sm">{product.category}</p>
                              </div>
                           </div>
                        </td>
                        <td className="px-4 py-2 text-sm">${product.price}</td>
                        <td className="px-4 py-2 text-sm">{product.stock}</td>
                        <td className="px-4 py-2 text-sm">
                           <span
                              className={`rounded-full px-2 py-1 text-xs font-medium ${
                                 product.isActive
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                           >
                              {product.isActive ? "Active" : "Inactive"}
                           </span>
                        </td>

                        <td className="px-4 py-2 text-sm">
                           <div className="flex justify-center gap-x-3">
                              <Link
                                 href={`/products/${product.id}/update`}
                                 className="text-muted-foreground bg-muted hover:text-foreground flex-center size-9 rounded-full transition-colors"
                              >
                                 <Pencil className="size-5" />
                              </Link>

                              <DeleteProductButton productId={product.id} />
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </DashboardContainer>
   );
}
