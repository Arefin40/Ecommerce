"use client";
import Image from "next/image";

export default function ProductForm() {
   return (
      <div className="container mx-auto px-4 py-8">
         <form
            method="post"
            encType="multipart/form-data"
            className="flex flex-1 flex-col space-y-6 rounded-xl bg-white p-6 shadow-lg"
         >
            <header className="flex items-center justify-between border-b border-gray-100 pb-4">
               <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-gray-900">Add Product</h2>
                  <p className="text-sm text-gray-500">Add a new product to your store</p>
               </div>

               <button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 rounded-lg px-6 py-2.5 text-sm font-medium text-white transition-colors"
               >
                  Save Draft
               </button>
            </header>

            <main className="grid grid-cols-2 gap-8">
               <section className="space-y-6">
                  <div className="rounded-lg border border-gray-200 bg-white">
                     <header className="border-b border-gray-100 px-6 py-4">
                        <h3 className="text-lg font-medium text-gray-900">General Information</h3>
                     </header>
                     <main className="space-y-4 p-6">
                        <div className="space-y-1.5">
                           <label htmlFor="name" className="text-sm font-medium text-gray-700">
                              Product Name
                           </label>
                           <input
                              type="text"
                              id="name"
                              name="name"
                              placeholder="Enter product name"
                              className="focus:border-primary focus:ring-primary w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm placeholder:text-gray-400 focus:ring-1 focus:outline-none"
                           />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                           <div className="space-y-1.5">
                              <label htmlFor="price" className="text-sm font-medium text-gray-700">
                                 Price
                              </label>
                              <input
                                 type="number"
                                 id="price"
                                 name="price"
                                 placeholder="0.00"
                                 className="focus:border-primary focus:ring-primary w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm placeholder:text-gray-400 focus:ring-1 focus:outline-none"
                              />
                           </div>

                           <div className="space-y-1.5">
                              <label htmlFor="stock" className="text-sm font-medium text-gray-700">
                                 Stock
                              </label>
                              <input
                                 type="number"
                                 id="stock"
                                 name="stock"
                                 placeholder="0"
                                 className="focus:border-primary focus:ring-primary w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm placeholder:text-gray-400 focus:ring-1 focus:outline-none"
                              />
                           </div>

                           <div className="space-y-1.5">
                              <label htmlFor="sku" className="text-sm font-medium text-gray-700">
                                 SKU
                              </label>
                              <input
                                 type="text"
                                 id="sku"
                                 name="sku"
                                 placeholder="Enter SKU"
                                 className="focus:border-primary focus:ring-primary w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm placeholder:text-gray-400 focus:ring-1 focus:outline-none"
                              />
                           </div>
                        </div>

                        <div className="space-y-1.5">
                           <label
                              htmlFor="description"
                              className="text-sm font-medium text-gray-700"
                           >
                              Description
                           </label>
                           <textarea
                              id="description"
                              name="description"
                              rows={8}
                              placeholder="Enter product description"
                              className="focus:border-primary focus:ring-primary w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm placeholder:text-gray-400 focus:ring-1 focus:outline-none"
                           ></textarea>
                        </div>
                     </main>
                  </div>
               </section>

               <section className="space-y-6">
                  <div className="rounded-lg border border-gray-200 bg-white">
                     <header className="border-b border-gray-100 px-6 py-4">
                        <h3 className="text-lg font-medium text-gray-900">Images</h3>
                     </header>
                     <main className="space-y-4 p-6">
                        <div className="relative flex min-h-[200px] items-center justify-center rounded-lg border-2 border-dashed border-gray-200">
                           <div className="text-center">
                              <Image
                                 src="/upload-icon.png"
                                 alt="Upload Icon"
                                 width={40}
                                 height={40}
                                 className="mx-auto mb-2"
                              />
                              <p className="text-sm font-medium text-gray-700">Upload main image</p>
                              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                           </div>
                           <input
                              type="file"
                              name="main_image"
                              accept="image/*"
                              className="absolute inset-0 cursor-pointer opacity-0"
                           />
                        </div>

                        <div className="relative flex h-24 items-center justify-center rounded-lg border-2 border-dashed border-gray-200">
                           <div className="flex items-center gap-2">
                              <Image
                                 src="/upload-icon.png"
                                 alt="Upload Icon"
                                 width={24}
                                 height={24}
                              />
                              <p className="text-sm font-medium text-gray-700">
                                 Add more images (max 3)
                              </p>
                           </div>
                           <input
                              type="file"
                              name="images"
                              accept="image/*"
                              multiple
                              className="absolute inset-0 cursor-pointer opacity-0"
                           />
                        </div>
                     </main>
                  </div>

                  <div className="rounded-lg border border-gray-200 bg-white">
                     <header className="border-b border-gray-100 px-6 py-4">
                        <h3 className="text-lg font-medium text-gray-900">Categories</h3>
                     </header>
                     <main className="space-y-4 p-6">
                        <div className="space-y-1.5">
                           <label htmlFor="category" className="text-sm font-medium text-gray-700">
                              Category
                           </label>
                           <input
                              type="text"
                              id="category"
                              name="category"
                              placeholder="Enter category"
                              className="focus:border-primary focus:ring-primary w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm placeholder:text-gray-400 focus:ring-1 focus:outline-none"
                           />
                        </div>

                        <div className="space-y-1.5">
                           <label
                              htmlFor="collection"
                              className="text-sm font-medium text-gray-700"
                           >
                              Collection
                           </label>
                           <select
                              id="collection"
                              name="collection"
                              className="focus:border-primary focus:ring-primary w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:ring-1 focus:outline-none"
                           >
                              <option value="">Select collection</option>
                              <option value="summer">Summer 2025</option>
                              <option value="winter">Winter 2025</option>
                           </select>

                           <div className="mt-3">
                              <label
                                 htmlFor="new_collection"
                                 className="text-sm font-medium text-gray-700"
                              >
                                 Or create new collection
                              </label>
                              <input
                                 type="text"
                                 id="new_collection"
                                 name="new_collection"
                                 placeholder="Enter collection name"
                                 className="focus:border-primary focus:ring-primary mt-1 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm placeholder:text-gray-400 focus:ring-1 focus:outline-none"
                              />
                           </div>
                        </div>
                     </main>
                  </div>
               </section>
            </main>
         </form>
      </div>
   );
}
