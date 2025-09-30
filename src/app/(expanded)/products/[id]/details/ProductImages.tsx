"use client";

import React from "react";
import Image from "next/image";

export default function ProductImages({
   product
}: {
   product: {
      image: string | null;
      name: string;
      images: string[];
   };
}) {
   const [previewImage, setPreviewImage] = React.useState(product.image);

   return (
      <div className="flex flex-1 flex-col space-y-4 gap-x-3 xl:flex-row">
         <Image
            src={previewImage as string}
            alt={product.name}
            width={0}
            height={0}
            sizes="100vw"
            className="order-1 h-auto w-full rounded-2xl border object-cover object-center xl:order-2"
            priority
         />

         <div className="order-2 flex w-full shrink-0 items-center gap-3 xl:order-1 xl:max-w-24 xl:flex-col">
            <button
               onClick={() => setPreviewImage(product.image)}
               className="aspect-square overflow-hidden rounded-lg border border-gray-100"
            >
               <Image
                  src={product.image as string}
                  alt={`View ${product.image}`}
                  width={100}
                  height={100}
                  className="size-20 object-cover object-top xl:size-full"
               />
            </button>

            {product.images.map((i) => (
               <button
                  key={i}
                  onClick={() => setPreviewImage(i)}
                  className="aspect-square overflow-hidden rounded-lg border border-gray-100"
               >
                  <Image
                     src={i as string}
                     alt={`View ${i}`}
                     width={100}
                     height={100}
                     className="size-20 object-cover object-top xl:size-full"
                  />
               </button>
            ))}
         </div>
      </div>
   );
}
