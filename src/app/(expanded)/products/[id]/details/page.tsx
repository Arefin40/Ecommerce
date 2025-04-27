import Image from "next/image";
import { redirect } from "next/navigation";
import FollowButton from "@/components/FollowButton";
import { getProductById } from "@/actions/products";
import { getFollowedStores } from "@/actions/store";
import DetailsActionButtons from "./DetailsActionButtons";

async function ProductDetailsPage({ params }: { params: { id: string } }) {
   const productData = await getProductById(params.id);
   const followedStores = await getFollowedStores();

   if (productData.length === 0) redirect("/products");
   const p = productData[0];

   return (
      <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
         <div className="grid gap-8 pt-12 lg:grid-cols-2">
            {/* Product Images */}
            <div className="flex gap-6">
               <div className="hidden w-24 flex-shrink-0 flex-col gap-2 sm:flex">
                  {/* Thumbnails would go here */}
               </div>
               <div className="aspect-square w-full overflow-hidden rounded-2xl border bg-gray-50">
                  <Image
                     src={p.image as string}
                     alt={p.name}
                     width={800}
                     height={800}
                     className="h-full w-full object-cover object-top"
                     priority
                  />
               </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
               <div>
                  <h1 className="text-foreground text-3xl font-bold tracking-tight">{p.name}</h1>
                  <p className="text-foreground mt-3 text-2xl font-semibold">{p.price} Tk.</p>
               </div>

               {/* Stock Status */}
               <div className="flex items-center gap-2">
                  <span
                     className={`inline-block h-3 w-3 rounded-full ${p.stock > 0 ? "bg-green-500" : "bg-red-500"}`}
                  />
                  <p className="text-muted-foreground text-sm font-medium">
                     {p.stock > 0 ? "In Stock" : "Out of Stock"}
                  </p>
               </div>

               {/* Action Buttons */}
               <DetailsActionButtons productId={p.id} />

               {/* Product Description */}
               <div
                  className="prose prose-lg prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-primary/90 text-muted-foreground max-w-none"
                  dangerouslySetInnerHTML={{ __html: p.description || "" }}
               />

               {/* Store Info */}
               <div className="inline-flex items-center gap-x-16 gap-y-4 rounded-full border p-4">
                  <div className="flex items-center gap-x-4">
                     <Image
                        src={(p.store?.logo as string) || "/default-store.png"}
                        alt={p.store?.name || "Store"}
                        width={64}
                        height={64}
                        className="h-16 w-16 flex-shrink-0 rounded-full bg-gray-100"
                     />
                     <div className="flex-1">
                        <p className="text-foreground text-lg font-semibold">{p.store?.name}</p>
                        <p className="text-sm text-gray-500">@{p.store?.slug}</p>
                     </div>
                  </div>

                  <FollowButton
                     storeId={p.store?.id || ""}
                     isFollowed={followedStores.includes(p.store?.id || "")}
                     className="h-12 rounded-full px-6 text-base"
                  />
               </div>
            </div>
         </div>
      </main>
   );
}

export default ProductDetailsPage;
