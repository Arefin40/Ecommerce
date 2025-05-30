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
      <div className="space-y-4">
         <div className="aspect-square overflow-hidden rounded-2xl border bg-white">
            <Image
               src={previewImage as string}
               alt={product.name}
               width={800}
               height={800}
               className="h-full w-full object-cover object-center"
               priority
            />
         </div>

         <div className="grid grid-cols-4 gap-4">
            <button
               onClick={() => setPreviewImage(product.image)}
               className="aspect-square overflow-hidden rounded-lg border border-gray-100"
            >
               <Image
                  src={product.image as string}
                  alt={`View ${product.image}`}
                  width={100}
                  height={100}
                  className="h-full w-full object-cover object-center"
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
                     className="h-full w-full object-cover object-center"
                  />
               </button>
            ))}
         </div>
      </div>
   );
}
