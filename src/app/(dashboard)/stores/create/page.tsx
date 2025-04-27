"use client";

import Image from "next/image";
import { Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Label, Textarea } from "@/components/ui/form";
import { storeFormSchema, StoreFormValues } from "@/lib/validation/merchant";
import StorePreview from "./StorePreview";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";
import { uploadImagesToCloudinary } from "@/actions/image-upload";
import { createStore } from "@/actions/store";
import { useRouter } from "next/navigation";

export default function CreateStorePage() {
   const router = useRouter();

   const {
      register,
      watch,
      reset,
      handleSubmit,
      formState: { errors }
   } = useForm<StoreFormValues>({
      resolver: zodResolver(storeFormSchema)
   });

   const onSubmit = async (data: StoreFormValues) => {
      if (data.logo) {
         const formData = new FormData();
         formData.append("image", data.logo);
         if (data.cover) formData.append("image", data.cover);
         formData.append("upload_preset", "shobai");

         try {
            const imageUrls = await uploadImagesToCloudinary(formData);
            if (imageUrls.success && imageUrls.urls) {
               data.logo = imageUrls.urls[0];
               if (imageUrls.urls[1]) data.cover = imageUrls.urls[1];
            }
         } catch (error) {
            console.error("Error uploading image:", error);
         }
      }

      const result = await createStore(data);
      if (result.success) {
         toast.success("Store created successfully");
         router.push(`/stores/${result.data.slug}`);
      } else {
         toast.error("Failed to create store");
      }

      reset();
   };

   const logoFile = watch("logo");
   const logoPreview = logoFile?.[0] ? URL.createObjectURL(logoFile[0]) : null;

   const coverFile = watch("cover");
   const coverPreview = coverFile?.[0] ? URL.createObjectURL(coverFile[0]) : null;

   return (
      <section className="grid h-screen flex-1 grid-cols-[24rem_1fr]">
         <aside className="scroll-hide relative overflow-y-auto border-r">
            <div className="bg-background/50 sticky top-0 z-10 flex flex-col gap-2 px-6 py-4 backdrop-blur-md">
               <h1 className="text-xl font-bold">Create Store</h1>
            </div>
            <p className="text-muted-foreground px-6">
               Fill in your store details and preview your store&apos;s appearance. Click create
               when you&apos;re ready to launch.
            </p>

            <div className="p-6">
               <form
                  method="post"
                  className="mt-5 flex-1 space-y-6"
                  encType="multipart/form-data"
                  onSubmit={handleSubmit(onSubmit)}
               >
                  {/* Store Name */}
                  <div className="space-y-2">
                     <Label htmlFor="name">Store Name</Label>
                     <Input
                        id="name"
                        placeholder="Enter store name"
                        {...register("name")}
                        error={errors.name}
                     />
                  </div>

                  {/* Store Slug */}
                  <div className="space-y-2">
                     <Label htmlFor="slug">Store Slug</Label>
                     <Input
                        id="slug"
                        placeholder="Enter store slug"
                        {...register("slug")}
                        error={errors.slug}
                     />

                     <div className="text-sm text-gray-500">
                        <span>This will be used to create your store&apos;s URL. E.g:</span>
                        <div className="mt-1 flex items-center">
                           <span>shobai.com/</span>
                           <span className="text-muted-foreground font-medium">storename</span>
                        </div>
                     </div>
                  </div>

                  {/* Store Logo */}
                  <div className="space-y-2">
                     <Label>Store Logo</Label>
                     <div
                        className={cn(
                           "relative flex size-36 items-center justify-center rounded-full border-2 border-gray-300 transition-colors hover:border-gray-400",
                           {
                              "border-0": logoPreview,
                              "border-dashed": !logoPreview
                           }
                        )}
                     >
                        <input
                           type="file"
                           className="absolute inset-0 cursor-pointer opacity-0"
                           {...register("logo")}
                        />

                        {logoPreview && (
                           <Image
                              src={logoPreview}
                              alt="Upload Store Logo"
                              width={160}
                              height={160}
                              className="pointer-events-none absolute inset-0 h-full overflow-hidden rounded-full object-cover"
                           />
                        )}

                        <div className="flex flex-col items-center gap-y-2">
                           <Upload className="pointer-events-none size-8 text-gray-400" />
                           <p className="text-muted-foreground text-sm font-medium">
                              Click to upload
                           </p>
                        </div>
                     </div>

                     {errors.logo && (
                        <p className="text-destructive text-sm">
                           {errors.logo.message?.toString()}
                        </p>
                     )}
                  </div>

                  {/* Store Cover */}
                  <div className="space-y-2">
                     <Label>Store Cover</Label>
                     <div
                        className={cn(
                           "relative flex w-full flex-col items-center gap-y-2 overflow-hidden rounded-md border-2 border-gray-300 p-4 transition-colors hover:border-gray-400",
                           {
                              "border-0": coverPreview,
                              "border-dashed": !coverPreview
                           }
                        )}
                     >
                        <input
                           type="file"
                           className="absolute inset-0 cursor-pointer opacity-0"
                           {...register("cover")}
                        />

                        {coverPreview && (
                           <Image
                              src={coverPreview}
                              alt="Upload Store Cover"
                              width={512}
                              height={512}
                              className="pointer-events-none absolute inset-0 h-full overflow-hidden object-cover"
                           />
                        )}
                        <Upload className="pointer-events-none size-8 text-gray-400" />

                        <div className="pointer-events-none space-y-2 text-center">
                           <p className="text-muted-foreground text-sm font-medium">
                              Click to upload
                           </p>
                           <p className="text-sm text-gray-500">
                              Upload a cover image that will appear at the top of your store page
                           </p>
                        </div>
                     </div>
                  </div>

                  {/* Store Description */}
                  <div className="space-y-2">
                     <Label htmlFor="description">Store Description</Label>
                     <Textarea
                        id="description"
                        placeholder="Enter store description"
                        rows={6}
                        className="min-h-28"
                        {...register("description")}
                     />
                     {errors.description && (
                        <p className="text-destructive text-sm">
                           {errors.description.message?.toString()}
                        </p>
                     )}
                  </div>

                  <Button className="mt-4 w-full" type="submit">
                     Create Store
                  </Button>
               </form>
            </div>
         </aside>

         <StorePreview
            storeName={watch("name") || "Store Name"}
            storeSlug={watch("slug") || "storename"}
            storeCover={coverPreview}
            storeLogo={logoPreview}
         />
      </section>
   );
}
