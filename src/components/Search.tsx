"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SearchIcon } from "lucide-react";
import { search } from "@/actions/search";

interface SearchItem {
   id: string;
   name: string;
   image: string | null;
}

interface SuggestedListItemProps extends React.ComponentProps<"li"> {
   type: "store" | "product";
   id?: string;
   image?: string;
}

function SuggestedListItem({ children, type, id, image }: SuggestedListItemProps) {
   return (
      <li className="hover:bg-accent hover:text-accent-foreground rounded-md p-2">
         <Link href={`/${type}s/${id}`} className="flex list-none items-center gap-2">
            {image && (
               <Image
                  src={image}
                  alt=""
                  height={40}
                  width={40}
                  aria-hidden="true"
                  className="size-8 overflow-hidden rounded-full object-cover object-top"
               />
            )}

            <span className="text-foreground font-semibold">{children}</span>
         </Link>
      </li>
   );
}

function Search() {
   const [query, setQuery] = useState("");
   const [results, setResults] = useState<{ stores: SearchItem[]; products: SearchItem[] }>({
      stores: [],
      products: []
   });

   const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);

      if (value) {
         const data = await search(value);
         setResults(data);
      } else {
         setResults({ stores: [], products: [] });
      }
   };

   return (
      <div className="relative w-full max-w-xl">
         <main className="bg-muted text-muted-foreground peer relative flex w-full items-center gap-2 rounded-full px-4 py-3">
            <SearchIcon className="size-5 shrink-0" />
            <input
               type="search"
               id="search"
               name="search"
               placeholder="Search"
               value={query}
               onChange={handleSearch}
               className="placeholder-muted-foreground text-foreground absolute inset-0 w-full pr-4 pl-11 text-sm outline-none"
            />
         </main>

         {(results.stores.length > 0 || results.products.length > 0) && (
            <div className="bg-background shadow-card absolute inset-x-0 top-full mt-1 space-y-5 rounded-lg border border-gray-50 py-4 text-sm">
               {results.stores.length > 0 && (
                  <div className="space-y-3">
                     <h2 className="text-muted-foreground px-4 font-semibold">Stores</h2>
                     <ul className="px-2">
                        {results.stores.map((store) => (
                           <SuggestedListItem
                              type="store"
                              key={store.id}
                              id={store.id}
                              image={store.image ?? ""}
                           >
                              {store.name}
                           </SuggestedListItem>
                        ))}
                     </ul>
                  </div>
               )}

               {results.products.length > 0 && (
                  <div className="space-y-3">
                     <h2 className="text-muted-foreground px-4 font-semibold">Products</h2>
                     <ul className="px-2">
                        {results.products.map((product) => (
                           <SuggestedListItem
                              type="product"
                              key={product.id}
                              id={product.id}
                              image={product.image ?? ""}
                           >
                              {product.name}
                           </SuggestedListItem>
                        ))}
                     </ul>
                  </div>
               )}
            </div>
         )}
      </div>
   );
}

export default Search;
