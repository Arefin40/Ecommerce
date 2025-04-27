import Image from "next/image";
import FollowButton from "./FollowButton";
import PostLikeButton from "./PostLikeButton";
import { getFollowedStores, getStores } from "@/actions/store";
import { getAllPosts, getLinkedPost } from "@/actions/social";

export default async function Home() {
   const stores = await getStores();
   const followedStores = await getFollowedStores();
   const posts = await getAllPosts();
   const linkedPosts = await getLinkedPost();

   return (
      <main className="box-container grid size-full h-screen grid-cols-[18rem_1fr_18rem] gap-4 pt-20">
         <aside className="rounded-xl bg-white p-6">Left Sidebar</aside>

         <main className="space-y-6 rounded-xl bg-white p-6">
            {posts.data?.map((post) => (
               <div key={post.id} className="rounded-lg border border-gray-100 bg-white shadow-sm">
                  {/* Post Header */}
                  <header className="flex items-center gap-3 border-b border-gray-100 px-6 py-2.5">
                     <div className="size-12 flex-shrink-0 rounded-full bg-gray-200">
                        <Image
                           src={post.store.logo}
                           alt={post.store.name as string}
                           width={48}
                           height={48}
                           className="size-12 rounded-full"
                        />
                     </div>
                     <div className="grid">
                        <p className="flex items-center gap-x-2">
                           <span className="text-foreground font-semibold">{post.store.name}</span>
                           <span className="text-muted-foreground text-sm">@{post.store.slug}</span>
                        </p>
                        <span className="text-muted-foreground text-sm">2h ago</span>
                     </div>
                  </header>

                  {/* Post Content */}
                  <main>
                     <div className="text-foreground space-y-2.5 px-6 py-3 text-sm">
                        {post.content}
                     </div>
                     {post.products.length > 0 && (
                        <div
                           className={`grid max-h-[25rem] w-full gap-0.5 ${
                              post.products.length === 3
                                 ? "grid-cols-[2fr,1fr] grid-rows-[repeat(2,200px)]"
                                 : post.products.length === 2
                                   ? "grid-cols-2"
                                   : "grid-cols-1"
                           }`}
                        >
                           {post.products.map((product, index) => (
                              <a
                                 key={index}
                                 href="#"
                                 className={`block h-full max-h-[25rem] w-full ${
                                    post.products.length === 3 && index === 0 ? "row-span-2" : ""
                                 }`}
                              >
                                 <Image
                                    src={product as string}
                                    alt={`Product ${index + 1}`}
                                    width={400}
                                    height={200}
                                    className="h-full w-full object-cover"
                                 />
                              </a>
                           ))}
                        </div>
                     )}
                  </main>

                  {/* Post Footer */}
                  <footer className="flex items-center px-6 py-4 text-sm">
                     <div className="flex items-center gap-x-2">
                        <PostLikeButton postId={post.id} isLiked={linkedPosts.includes(post.id)} />
                        <p>
                           {post.total_likes === 0
                              ? "Be the first to like this"
                              : `${post.total_likes} like${post.total_likes > 1 ? "s" : ""}`}
                        </p>
                     </div>
                  </footer>
               </div>
            ))}
         </main>

         <aside className="rounded-xl bg-white px-4 py-6">
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
                           <span className="text-muted-foreground pl-1 text-sm">@{store.slug}</span>
                        </p>

                        <FollowButton
                           storeId={store.id}
                           isFollowed={followedStores.includes(store.id)}
                        />
                     </div>
                  ))}
               </div>
            </div>
         </aside>
      </main>
   );
}
