import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "@/actions/products";
import { WishlistButton, AddToCartButton } from "./ProductCartButton";

async function page() {
   const products = await getAllProducts();

   return (
      <main className="box-container grid size-full grid-cols-[repeat(auto-fit,minmax(200px,1fr))] items-start gap-4 pt-20 xl:grid-cols-4">
         {products.map((product) => (
            <div key={product.id} className="group space-y-3 rounded-lg">
               <div className="border-border relative aspect-square overflow-hidden rounded-lg border">
                  <Link href={`/products/${product.id}/details`} className="block h-full w-full">
                     <Image
                        src={product.image as string}
                        alt={product.name}
                        width={512}
                        height={512}
                        className="h-full w-full rounded-lg object-cover object-top transition-transform duration-300 hover:scale-105"
                        priority
                     />
                  </Link>

                  <WishlistButton productId={product.id} />

                  <div className="absolute top-full left-1/2 flex -translate-x-1/2 items-center gap-x-1 transition-all duration-300 group-hover:-translate-y-12">
                     <Link
                        href={`/stores/${product.store?.slug}`}
                        className="text-foreground border-border flex flex-shrink-0 items-center gap-x-1 rounded-full border bg-white/75 p-3 py-2 text-sm shadow-2xs backdrop-blur-sm"
                     >
                        <Image
                           src={(product.store?.logo as string) || "/default-store.png"}
                           alt={product.store?.name || "Store"}
                           width={20}
                           height={20}
                           className="size-5 rounded-full"
                        />
                        <span>{product.store?.name}</span>
                     </Link>
                     <AddToCartButton productId={product.id} />
                  </div>
               </div>

               <div className="flex flex-col justify-between gap-y-1 text-sm font-semibold">
                  <Link
                     href={`/products/${product.id}/details`}
                     className="text-foreground truncate font-semibold"
                  >
                     {product.name}
                  </Link>

                  <div className="flex items-center justify-between">
                     <p>${product.price}</p>
                  </div>
               </div>
            </div>
         ))}
      </main>
   );
}

export default page;
