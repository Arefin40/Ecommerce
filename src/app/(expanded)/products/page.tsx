import { ProductCard } from "@/components/ui/productCard";


export default function AllProducts() {
   return (
      <div className="shadow-card col-span-1 col-start-2 mt-12 flex-1 rounded-lg bg-white p-6">
         <h1 className="text-4xl font-bold">All Products</h1>

         <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
         </div>
      </div>
   );
}
