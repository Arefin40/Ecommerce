import { getAllProducts } from "@/actions/products";
import ProductCard from "@/components/ProductCard";

async function page() {
   const products = await getAllProducts();

   return (
      <section className="h-screen bg-white">
         <main className="box-container h-full grid-cols-[18rem_1fr] gap-4">
            <div
               data-testid="product-grid"
               className="scroll-hide grid h-full grid-cols-2 items-start gap-4 overflow-y-auto pt-20 md:grid-cols-3 xl:grid-cols-4"
            >
               {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
               ))}
            </div>
         </main>
      </section>
   );
}

export default page;
