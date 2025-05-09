"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/form";
import DashboardContainer from "@/components/DashboardContainer";
import { productFormSchema, ProductFormValues } from "@/lib/validation/product";
import Image from "next/image";
import { useState } from "react";
import { uploadImagesToCloudinary } from "@/actions/image-upload";
import { createProduct } from "@/actions/products";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AddProduct() {
   const router = useRouter();
   const {
      register,
      handleSubmit,
      watch,
      formState: { errors }
   } = useForm<ProductFormValues>({
      resolver: zodResolver(productFormSchema),
      defaultValues: { name: "", category: "", description: "", price: 0, stock: 0 }
   });

   const formValues = watch();
   const [previewImage, setPreviewImage] = useState<string | null>(null);
   const [additionalImages, setAdditionalImages] = useState<string[]>([]);

   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
         const reader = new FileReader();
         reader.onloadend = () => {
            setPreviewImage(reader.result as string);
         };
         reader.readAsDataURL(file);
      } else {
         setPreviewImage(null);
      }
   };

   const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files) {
         const imagesArray: string[] = [];
         for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onloadend = () => {
               imagesArray.push(reader.result as string);
               if (i === files.length - 1) {
                  setAdditionalImages(imagesArray);
               }
            };
            reader.readAsDataURL(files[i]);
         }
      }
   };

   async function onSubmit(values: ProductFormValues) {
      if (!previewImage) return;

      const formData = new FormData();
      formData.append("image", values.image);
      if (values.images) {
         Array.from(values.images as FileList).forEach((image: File) => {
            formData.append("image", image);
         });
      }
      formData.append("upload_preset", "shobai");

      try {
         const imageUrls = await uploadImagesToCloudinary(formData);
         if (imageUrls.success && imageUrls.urls) {
            console.log(imageUrls.urls);
            values.image = imageUrls.urls[0];
            if (imageUrls.urls.length > 1) {
               values.images = imageUrls.urls.slice(1);
            }
         }

         const response = await createProduct({
            ...values,
            image: values.image,
            images: values.images || []
         });

         if (response.success) {
            toast.success(response.message);
            router.push("/manage-inventory");
         }
      } catch (error) {
         if (error instanceof Error) {
            toast.error(error.message);
         } else {
            toast.error("Failed to add product");
         }
      }
   }

   return (
      <DashboardContainer title="Add Product" description="Create a new product for your store">
         <div className="grid grid-cols-2 gap-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
               <div className="grid gap-6">
                  <Input
                     label="Product Name"
                     placeholder="Enter product name"
                     {...register("name")}
                     error={errors.name}
                  />
                  <Input
                     label="Category"
                     placeholder="Enter category"
                     {...register("category")}
                     error={errors.category}
                  />
                  <div className="grid grid-cols-2 gap-6">
                     <Input
                        label="Price"
                        placeholder="Enter price"
                        {...register("price")}
                        error={errors.price}
                     />
                     <Input
                        label="Stock"
                        placeholder="Enter stock"
                        {...register("stock")}
                        error={errors.stock}
                     />
                  </div>
                  <Input
                     label="Product Image"
                     type="file"
                     accept="image/*"
                     {...register("image", {
                        onChange: handleImageChange
                     })}
                  />
                  <Input
                     label="Additional Images"
                     type="file"
                     accept="image/*"
                     multiple
                     {...register("images", {
                        onChange: handleAdditionalImagesChange
                     })}
                  />
                  <div className="space-y-2">
                     <Label>Description</Label>
                     <Textarea
                        placeholder="Enter product description"
                        className="min-h-[120px]"
                        {...register("description")}
                     />
                     {errors.description && (
                        <span className="text-destructive text-sm">
                           {errors.description.message}
                        </span>
                     )}
                  </div>

                  <div className="flex">
                     <Button type="submit" className="h-11 min-w-56 rounded-full">
                        Add Product
                     </Button>
                  </div>
               </div>
            </form>

            <main className="bg-muted flex flex-col gap-y-6 rounded-lg p-6">
               <div className="flex justify-center">
                  <div className="shadow-card border-border w-full max-w-96 space-y-3 rounded-lg border bg-white p-4">
                     <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                        {previewImage ? (
                           <Image
                              fill
                              src={previewImage}
                              alt="Product preview"
                              className="border-border border object-cover object-top"
                           />
                        ) : (
                           <div className="flex h-full items-center justify-center text-gray-400">
                              No image selected
                           </div>
                        )}
                     </div>

                     <div className="grid grid-cols-3 gap-2">
                        {additionalImages.slice(0, 5).map((image, index) => (
                           <div
                              key={index}
                              className="relative aspect-square flex-1 overflow-hidden rounded-lg bg-gray-100"
                           >
                              <Image
                                 fill
                                 src={image}
                                 alt={`Additional image ${index + 1}`}
                                 className="border-border border object-cover object-top"
                              />
                           </div>
                        ))}
                     </div>

                     <div className="space-y-1.5">
                        <div className="flex flex-col gap-y-0.5">
                           <h3 className="text-lg font-semibold">
                              {formValues.name || "Product Name"}
                           </h3>
                           <p className="text-muted-foreground text-sm">
                              {formValues.category || "Category"}
                           </p>
                        </div>

                        <div className="flex items-center gap-x-2">
                           <p className="text-xl font-medium">${formValues.price || 0}</p>
                           <span className="text-muted-foreground">⋅</span>
                           <p className="text-muted-foreground text-sm">
                              {formValues.stock || 0} in stock
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </main>
         </div>
      </DashboardContainer>
   );
}
