import { Button } from "./button";

export function ProductCard() {
   return (
      <div className="group relative flex flex-col overflow-hidden rounded-lg border bg-white">
         <div className="aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden bg-gray-200 lg:h-80">
            <div className="h-full w-full bg-gradient-to-br from-gray-100 to-gray-300" />
         </div>

         <div className="flex flex-1 flex-col space-y-2 p-4">
            <span className="text-xs font-medium text-gray-500">Mens Fashion</span>
            <h3 className="text-sm font-medium text-gray-900">Classic Cotton Shirt</h3>
            <p className="text-muted-foreground text-xs">Premium Quality Cotton Casual Shirt</p>

            <div className="flex items-center justify-between">
               <p className="text-base font-semibold">$ 49.99</p>

               <Button size="sm" className="">
                  Add to Cart
               </Button>
            </div>
         </div>
      </div>
   );
}
