"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { LoaderCircle, SearchIcon } from "lucide-react";
import { search } from "@/actions/search";

interface SearchItem {
   id: string;
   name: string;
   image: string | null;
}

interface SuggestedListItemProps extends React.ComponentProps<"li"> {
   image?: string;
   href: string;
}

function SuggestedListItem({ children, image, href, ...props }: SuggestedListItemProps) {
   return (
      <li className="hover:bg-accent hover:text-accent-foreground rounded-md p-2" {...props}>
         <Link href={href} className="flex list-none items-center gap-2">
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
   const [showResults, setShowResults] = useState(false);
   const [query, setQuery] = useState("");
   const [results, setResults] = useState<{ stores: SearchItem[]; products: SearchItem[] }>({
      stores: [],
      products: []
   });
   const [isLoading, setIsLoading] = useState(false);
   const searchRef = useRef<HTMLDivElement>(null);

   const debounceTimer = useRef<NodeJS.Timeout | null>(null);

   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setShowResults(value.trim() !== "");
      setQuery(value);

      if (debounceTimer.current) {
         clearTimeout(debounceTimer.current);
      }

      setIsLoading(true);
      debounceTimer.current = setTimeout(async () => {
         if (value.trim()) {
            try {
               const data = await search(value);
               setResults(data);
            } catch (error) {
               console.error("Search failed:", error);
            } finally {
               setIsLoading(false);
            }
         } else {
            setResults({ stores: [], products: [] });
            setIsLoading(false);
         }
      }, 300);
   };

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
            setShowResults(false);
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);

   return (
      <div className="group relative w-full max-w-xl" ref={searchRef}>
         <div className="text-muted-foreground peer relative flex w-full items-center gap-2 rounded-full bg-gray-200 px-4 py-3">
            <SearchIcon className="size-5 shrink-0" />
            <input
               autoComplete="off"
               type="search"
               id="search"
               name="search"
               placeholder="Search"
               role="searchbox"
               value={query}
               onChange={handleSearch}
               onFocus={() => setShowResults(true)}
               className="placeholder-muted-foreground text-foreground absolute inset-0 w-full appearance-none pr-4 pl-11 text-sm outline-none"
            />
         </div>

         {showResults && query !== "" && (
            <div
               id="search-results"
               className="bg-background shadow-card absolute inset-x-0 top-full z-50 mt-1 space-y-4 rounded-lg border border-gray-50 py-4 text-sm"
            >
               {isLoading ? (
                  <div className="flex-center px-4">
                     <LoaderCircle className="animate-spin" />
                  </div>
               ) : results.stores.length > 0 || results.products.length > 0 ? (
                  <>
                     {results.stores.length > 0 && (
                        <div className="space-y-1">
                           <h2 className="text-muted-foreground px-4 font-semibold">Stores</h2>
                           <ul className="px-2">
                              {results.stores.map((store) => (
                                 <SuggestedListItem
                                    href={`/stores/${store.id}`}
                                    key={store.id}
                                    image={store.image ?? ""}
                                 >
                                    {store.name}
                                 </SuggestedListItem>
                              ))}
                           </ul>
                        </div>
                     )}
                     {results.products.length > 0 && (
                        <div className="space-y-1">
                           <h2 className="text-muted-foreground px-4 font-semibold">Products</h2>
                           <ul className="px-2">
                              {results.products.map((product) => (
                                 <SuggestedListItem
                                    href={`/products/${product.id}/details`}
                                    key={product.id}
                                    image={product.image ?? ""}
                                 >
                                    {product.name}
                                 </SuggestedListItem>
                              ))}
                           </ul>
                        </div>
                     )}
                  </>
               ) : (
                  <span className="px-4">No results found for &quot;{query}&quot;</span>
               )}
            </div>
         )}
      </div>
   );
}

export default Search;
