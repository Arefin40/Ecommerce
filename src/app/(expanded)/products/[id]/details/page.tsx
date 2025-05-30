import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getProductById } from "@/actions/products";
import { Star, Truck, Shield, ArrowLeft } from "lucide-react";
import ProductImages from "./ProductImages";
import DetailsActionButtons from "./DetailsActionButtons";

async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
   const { id } = await params;
   const productData = await getProductById(id);

   if (productData.length === 0) redirect("/products");
   const p = productData[0];

   return (
      <main className="scroll-hide h-screen overflow-y-auto bg-white py-24">
         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
               <Link href="/products" className="flex items-center gap-2 hover:text-gray-700">
                  <ArrowLeft size={16} />
                  Back to Products
               </Link>
               <span>/</span>
               <span>{p.category}</span>
            </nav>
            <div className="grid gap-12 lg:grid-cols-2">
               <ProductImages product={p} />

               <div className="space-y-8">
                  {/* Store Info */}
                  <div className="inline-flex items-center gap-3 rounded-full bg-gray-100 p-1.5">
                     <Image
                        src={(p.store?.logo as string) || "/default-store.png"}
                        alt={p.store?.name || "Store"}
                        width={48}
                        height={48}
                        className="size-7 rounded-full"
                     />
                     <p className="pr-4 font-medium">{p.store?.name}</p>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-4">
                     <h1 className="text-3xl font-bold tracking-tight text-gray-900">{p.name}</h1>

                     <div className="flex items-center gap-4">
                        <div className="flex items-center">
                           {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                 key={star}
                                 size={18}
                                 className="fill-yellow-400 text-yellow-400"
                              />
                           ))}
                        </div>
                     </div>

                     <div className="flex items-baseline gap-4">
                        <p className="text-4xl font-bold tracking-tight text-gray-900">
                           ৳{p.price.toLocaleString()}
                        </p>
                        <span className="text-sm text-gray-500">{p.stock} items in stock</span>
                     </div>
                  </div>

                  {/* Action Buttons */}
                  <DetailsActionButtons productId={p.id} />

                  {/* Description */}
                  <div className="prose prose-sm max-w-none border-t pt-8">
                     <h3 className="font-semibold">Product Description</h3>
                     <div
                        className="mt-4 text-sm whitespace-pre-wrap text-gray-600"
                        dangerouslySetInnerHTML={{ __html: p.description || "" }}
                     />
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-3 gap-4 rounded-lg border bg-white p-4">
                     <div className="text-center">
                        <Truck className="mx-auto h-6 w-6 text-blue-500" />
                        <p className="mt-2 text-sm font-medium">Free Shipping</p>
                        <p className="text-xs text-gray-500">On orders over ৳1000</p>
                     </div>
                     <div className="text-center">
                        <Shield className="mx-auto h-6 w-6 text-green-500" />
                        <p className="mt-2 text-sm font-medium">Secure Payment</p>
                        <p className="text-xs text-gray-500">100% secure checkout</p>
                     </div>
                     <div className="text-center">
                        <Star className="mx-auto h-6 w-6 text-yellow-500" />
                        <p className="mt-2 text-sm font-medium">Quality Promise</p>
                        <p className="text-xs text-gray-500">Satisfaction guaranteed</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </main>
   );
}

export default ProductDetailsPage;
