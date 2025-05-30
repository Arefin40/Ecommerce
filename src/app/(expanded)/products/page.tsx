import { getAllProducts } from "@/actions/products";
import ProductCard from "@/components/ProductCard";

async function page() {
   const products = await getAllProducts();

   return (
      <section className="h-screen bg-white">
         <main className="box-container h-full grid-cols-[18rem_1fr] gap-4">
            <div className="scroll-hide grid h-full grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] items-start gap-4 overflow-y-auto pt-20">
               {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
               ))}
            </div>
         </main>
      </section>
   );
}

export default page;
