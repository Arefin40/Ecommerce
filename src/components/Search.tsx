import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SearchIcon } from "lucide-react";

interface SuggestedListItemProps extends React.ComponentProps<"li"> {
   slug?: string;
   imageUrl?: string;
}

function SuggestedListItem({ children, slug, imageUrl }: SuggestedListItemProps) {
   return (
      <li className="hover:bg-accent hover:text-accent-foreground rounded-md p-2">
         <Link href={`/stores/${slug}`} className="flex list-none items-center gap-2">
            {imageUrl && (
               <Image
                  src={imageUrl}
                  alt=""
                  height={40}
                  width={40}
                  aria-hidden="true"
                  className="size-8 overflow-hidden rounded-full"
               />
            )}

            <span className="text-foreground font-semibold">{children}</span>
         </Link>
      </li>
   );
}

function Search() {
   return (
      <div className="relative w-full max-w-xl">
         <main className="bg-muted text-muted-foreground peer relative flex w-full items-center gap-2 rounded-full px-4 py-3">
            <SearchIcon className="size-5 shrink-0" />
            <input
               type="search"
               id="search"
               name="search"
               placeholder="Search"
               className="placeholder-muted-foreground text-foreground absolute inset-0 w-full pr-4 pl-11 text-sm outline-none"
            />
         </main>

         <div className="bg-background shadow-card absolute inset-x-0 top-full mt-1 hidden space-y-5 rounded-lg border border-gray-50 py-4 text-sm peer-focus-within:block">
            <div className="space-y-3">
               <h2 className="text-muted-foreground px-4 font-semibold">Products</h2>
               <ul className="px-2">
                  {Array.from({ length: 3 }).map((_, index) => (
                     <SuggestedListItem key={index} slug="goodybro" imageUrl="/images/GoodyBro.png">
                        GoodyBro
                     </SuggestedListItem>
                  ))}
               </ul>
            </div>
         </div>
      </div>
   );
}

export default Search;
