"use client";

import { z } from "zod";
import React from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/form";
import { useRouter, useParams } from "next/navigation";
import { getMyStoreProducts } from "@/actions/products";
import { updatePost, getPostById } from "@/actions/social";
import DashboardContainer from "@/components/DashboardContainer";

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

export default function UpdatePostPage() {
   const router = useRouter();
   const params = useParams();
   const postId = params.id as string;
   const [products, setProducts] = React.useState<Product[]>([]);
   const [loading, setLoading] = React.useState(false);
   const [selectedProducts, setSelectedProducts] = React.useState<string[]>([]);

   const {
      register,
      handleSubmit,
      setValue,
      formState: { errors }
   } = useForm<PostFormValues>({
      resolver: zodResolver(postSchema)
   });

   React.useEffect(() => {
      const fetchData = async () => {
         try {
            const [productsRes, postRes] = await Promise.all([
               getMyStoreProducts(),
               getPostById(postId)
            ]);

            if (productsRes.success) {
               setProducts(productsRes.data as Product[]);
            }

            if (postRes.success) {
               setValue("content", postRes.data?.content || "");
               setSelectedProducts(postRes.data?.products || []);
               setValue("products", postRes.data?.products || []);
            }
         } catch (error) {
            console.error("Error fetching data:", error);
         }
      };
      fetchData();
   }, [postId, setValue]);

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
         await updatePost(postId, data);
         toast.success("Post updated successfully");
         router.push("/manage-posts");
      } catch (error) {
         console.error(error);
         toast.error("Failed to update post");
      } finally {
         setLoading(false);
      }
   };

   if (!products) return null;

   return (
      <DashboardContainer title="Update Post" description="Edit your post and update the products">
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
                     {loading ? "Updating..." : "Update Post"}
                  </Button>
               </div>
            </div>
         </form>
      </DashboardContainer>
   );
}
