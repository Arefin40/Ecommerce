import Image from "next/image";
import Link from "next/link";
import FollowButton from "@/components/FollowButton";
import PostLikeButton from "./PostLikeButton";
import { getFollowedStores, getStores } from "@/actions/store";
import { getAllPosts, getLinkedPost } from "@/actions/social";
import { getRandomBestSeller } from "@/actions/products";

export default async function Home() {
   const stores = await getStores();
   const followedStores = await getFollowedStores();
   const posts = await getAllPosts();
   const linkedPosts = await getLinkedPost();
   const bestSeller = await getRandomBestSeller();

   return (
      <section className="h-screen bg-gray-100">
         <section className="box-container grid size-full h-screen grid-cols-[1fr_20rem] gap-4 xl:grid-cols-[20rem_1fr_24rem] xl:gap-6">
            <aside className="hidden flex-col pt-20 xl:flex">
               <div className="space-y-4 rounded-xl bg-white p-4">
                  <div className="relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-gray-200 to-gray-300">
                     <Image
                        priority
                        width={855}
                        height={654}
                        src="https://res.cloudinary.com/arefin40/image/upload/v1748596259/shobai/ods6wkehsbkzjfva83ll.webp"
                        alt="Advertise 2"
                        className="aspect-auto w-full max-w-full object-contain object-center"
                     />

                     <div className="absolute inset-x-0 bottom-0 flex items-center justify-center bg-white/20 py-4 text-white">
                        <div className="text-center">
                           <p className="font-bold tracking-wider">NEW ARRIVAL</p>
                           <p className="mt-1 text-sm opacity-90">Limited Time Offer</p>
                        </div>
                     </div>
                  </div>

                  <div className="group relative w-full cursor-pointer overflow-hidden rounded-lg bg-gradient-to-br from-gray-100 to-gray-200">
                     <Image
                        priority
                        width={855}
                        height={654}
                        src="https://res.cloudinary.com/arefin40/image/upload/v1748596259/shobai/tzqfrxfuymg9yffndom4.webp"
                        alt="Advertise 3"
                        className="aspect-auto w-full max-w-full object-contain object-center"
                     />
                     <div className="absolute right-0 bottom-0 left-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>

                  <div className="group relative w-full cursor-pointer overflow-hidden rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 transition-all duration-500 hover:shadow-lg">
                     <Image
                        priority
                        width={563}
                        height={860}
                        src="https://res.cloudinary.com/arefin40/image/upload/v1748596259/shobai/ei2oee22gpq05dj2gqzq.jpg"
                        alt="Advertise 3"
                        className="aspect-auto w-full max-w-full overflow-hidden rounded-lg object-contain object-center"
                     />
                  </div>
               </div>
            </aside>

            <main className="scroll-hide flex flex-col overflow-y-auto pt-20">
               <section className="space-y-6">
                  {posts.data?.map((post) => (
                     <div
                        key={post.id}
                        data-testid="post"
                        className="rounded-lg border border-gray-100 bg-white"
                     >
                        {/* Post Header */}
                        <header className="flex items-center gap-3 border-b border-gray-100 px-6 py-2.5">
                           <div className="size-12 flex-shrink-0 rounded-full bg-gray-200">
                              <Image
                                 src={post.store?.logo ?? ""}
                                 alt={post.store?.name ?? ""}
                                 width={48}
                                 height={48}
                                 className="size-12 rounded-full"
                              />
                           </div>
                           <div className="grid">
                              <p className="flex items-center gap-x-2">
                                 <span className="text-foreground font-semibold">
                                    {post.store?.name}
                                 </span>
                                 <span className="text-muted-foreground text-sm">
                                    @{post.store?.slug}
                                 </span>
                              </p>
                              <span className="text-muted-foreground text-sm">
                                 {post.createdAt.toLocaleString()}
                              </span>
                           </div>
                        </header>

                        {/* Post Content */}
                        <main data-testid="post-content">
                           <div className="text-foreground space-y-2.5 px-6 py-3 text-sm whitespace-pre-wrap">
                              {post.content}
                           </div>
                           {post.products.length > 0 && (
                              <div
                                 className={`grid w-full gap-0.5 ${
                                    post.products.length === 3
                                       ? "grid-cols-[2fr,1fr] grid-rows-[repeat(2,200px)]"
                                       : post.products.length === 2
                                         ? "grid-cols-2"
                                         : "grid-cols-1"
                                 }`}
                              >
                                 {post.products.map((product, index) => (
                                    <Link
                                       key={index}
                                       data-testid="post-product"
                                       href={`/products/${product?.id}/details`}
                                       className={`relative block aspect-square h-full w-full overflow-hidden ${
                                          post.products.length === 3 && index === 0
                                             ? "row-span-2"
                                             : ""
                                       }`}
                                    >
                                       <Image
                                          fill
                                          priority
                                          src={product.image ?? ""}
                                          alt={`Product ${index + 1}`}
                                          sizes="800px"
                                          className="h-full w-full object-cover object-top"
                                       />
                                    </Link>
                                 ))}
                              </div>
                           )}
                        </main>

                        {/* Post Footer */}
                        <footer className="flex items-center px-6 py-2.5 text-sm">
                           <PostLikeButton
                              postId={post.id}
                              totalLikes={post.total_likes}
                              isLiked={linkedPosts.includes(post.id)}
                           />
                        </footer>
                     </div>
                  ))}
               </section>
            </main>

            <aside className="flex flex-col gap-y-4 pt-20">
               <div className="rounded-xl bg-white px-4 py-6">
                  <div className="space-y-4">
                     <h1 className="text-muted-foreground">Trending Stores</h1>
                     <div className="flex flex-col gap-y-4">
                        {stores.map((store) => (
                           <div key={store.id} className="flex items-center">
                              <Image
                                 src={store.logo ?? ""}
                                 alt={store.name}
                                 width={100}
                                 height={100}
                                 className="size-13 shrink-0 rounded-full"
                              />

                              <p className="mr-auto ml-2 flex flex-col leading-normal">
                                 <span className="text-foreground font-bold">{store.name}</span>
                                 <span className="text-muted-foreground pl-1 text-sm">
                                    @{store.slug}
                                 </span>
                              </p>

                              <FollowButton
                                 storeId={store.id}
                                 isFollowed={followedStores.includes(store.id)}
                              />
                           </div>
                        ))}
                     </div>
                  </div>
               </div>

               <div className="rounded-xl bg-white px-4 py-6">
                  <div className="space-y-4">
                     <h1 className="text-muted-foreground">Best Seller</h1>

                     <div className="grid grid-cols-3 gap-4">
                        {bestSeller.data?.map((product) => (
                           <Link
                              key={product.id}
                              href={`/products/${product.id}/details`}
                              className="group relative block overflow-hidden rounded-lg bg-gray-100 transition-all duration-500 hover:scale-[1.02] hover:shadow-lg"
                           >
                              <Image
                                 src={product.image ?? ""}
                                 alt={product.name}
                                 width={200}
                                 height={200}
                                 className="aspect-square w-full object-cover"
                              />
                              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent p-1">
                                 <p className="text-xs font-semibold text-white">{product.name}</p>
                              </div>
                           </Link>
                        ))}
                     </div>
                  </div>
               </div>

               <div className="group relative w-full cursor-pointer overflow-hidden rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl">
                  <Image
                     priority
                     width={999}
                     height={666}
                     className="aspect-auto w-full max-w-full object-contain object-center"
                     src="https://res.cloudinary.com/arefin40/image/upload/v1748596823/shobai/cruunfhdt4skzxj119jf.webp"
                     alt="Advertise 1"
                  />
               </div>
            </aside>
         </section>
      </section>
   );
}
