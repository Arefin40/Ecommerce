"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/form";
import Image from "next/image";
import { createPost } from "@/actions/social";
import DashboardContainer from "@/components/DashboardContainer";
import { getMyStoreProducts } from "@/actions/products";
import { useRouter } from "next/navigation";
const postSchema = z.object({
   content: z.string().min(1, "Content is required"),
   image: z.string().optional(),
   products: z.array(z.string()).min(1).max(3)
});

type PostFormValues = z.infer<typeof postSchema>;

interface Product {
   id: string;
   name: string;
   image: string;
}

export default function CreatePostPage() {
   const router = useRouter();
   const [products, setProducts] = useState<Product[]>([]);
   const [loading, setLoading] = useState(false);
   const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

   const {
      register,
      handleSubmit,
      setValue,
      formState: { errors }
   } = useForm<PostFormValues>({
      resolver: zodResolver(postSchema),
      defaultValues: {
         products: []
      }
   });

   React.useEffect(() => {
      const fetchProducts = async () => {
         try {
            const products = await getMyStoreProducts();
            if (products.success) {
               setProducts(products.data as Product[]);
            } else {
               console.error(products.message);
            }
         } catch (error) {
            if (error instanceof Error) {
               console.log(error.message);
            } else {
               console.error(error);
            }
         }
      };
      fetchProducts();
   }, []);

   const handleProductSelect = (productId: string) => {
      setSelectedProducts((prev) => {
         let newSelection;
         if (prev.includes(productId)) {
            newSelection = prev.filter((id) => id !== productId);
         } else {
            if (prev.length >= 3) return prev;
            newSelection = [...prev, productId];
         }
         setValue("products", newSelection);
         return newSelection;
      });
   };

   const onSubmit = async (data: PostFormValues) => {
      try {
         setLoading(true);
         await createPost(data);
         toast.success("Post created successfully");
         router.push("/manage-posts");
      } catch (error) {
         console.error(error);
         toast.error("Failed to create post");
      } finally {
         setLoading(false);
      }
   };

   if (!products) return null;

   return (
      <DashboardContainer
         title="Create Post"
         description="Share updates and products with your followers"
      >
         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6">
               <div className="max-w-4xl">
                  <Textarea
                     {...register("content")}
                     placeholder="What's on your mind?"
                     className="min-h-[150px]"
                  />
                  {errors.content && (
                     <p className="mt-1 text-sm text-red-500">{errors.content.message}</p>
                  )}
               </div>

               <div>
                  <h3 className="mb-4 text-lg font-semibold">Select Products (1-3)</h3>
                  <div className="grid grid-cols-5 gap-4">
                     {products?.map((product) => (
                        <div
                           key={product.id}
                           onClick={() => handleProductSelect(product.id)}
                           className={`relative cursor-pointer rounded-lg border-2 transition-all ${
                              selectedProducts.includes(product.id)
                                 ? "border-primary ring-primary bg-primary/10"
                                 : "hover:bg-gray-50"
                           }`}
                        >
                           <div className="relative aspect-square w-full overflow-hidden">
                              <Image
                                 fill
                                 src={product.image}
                                 alt={product.name}
                                 className="rounded-md object-cover object-top"
                              />
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="flex">
                  <Button type="submit" disabled={loading} className="h-11 min-w-56 rounded-full">
                     {loading ? "Posting..." : "Create Post"}
                  </Button>
               </div>
            </div>
         </form>
      </DashboardContainer>
   );
}
