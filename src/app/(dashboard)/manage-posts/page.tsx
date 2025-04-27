import React from "react";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/lib/auth";
import PostAction from "./PostAction";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getPostsMyStorePosts } from "@/actions/social";
import DashboardContainer from "@/components/DashboardContainer";

export default async function ManagePosts() {
   const session = await auth.api.getSession({ headers: await headers() });
   if (!session?.user) redirect("/login");

   const posts = await getPostsMyStorePosts();

   return (
      <DashboardContainer
         title="Manage Posts"
         description="Here you can manage all the posts"
         actions={
            <Link
               href="/posts/create"
               className="flex-center bg-primary h-11 rounded-full px-4 text-white"
            >
               Create Post
            </Link>
         }
      >
         <div className="border-border overflow-hidden rounded-md border">
            <table className="min-w-full border-collapse bg-white">
               <thead className="bg-accent">
                  <tr>
                     <th className="text-muted-foreground px-4 py-3 text-left text-sm font-semibold">
                        Content
                     </th>
                     <th className="text-muted-foreground min-w-64 px-4 py-3 text-left text-sm font-semibold">
                        Products
                     </th>
                     <th className="text-muted-foreground w-56 px-4 py-3 text-left text-sm font-semibold">
                        Created At
                     </th>
                     <th className="text-muted-foreground w-40 px-4 py-3 text-center text-sm font-semibold">
                        Likes
                     </th>
                     <th className="text-muted-foreground w-36 px-4 py-3 text-center text-sm font-semibold">
                        Action
                     </th>
                  </tr>
               </thead>

               <tbody>
                  {posts.data?.map((post) => (
                     <tr key={post.id}>
                        <td className="px-4 py-2 text-sm">
                           <p className="text-sm font-medium">{post.content.slice(0, 40)}...</p>
                        </td>
                        <td className="px-4 py-2 text-sm">
                           <div className="flex">
                              {post.products.map((product) => (
                                 <Image
                                    key={product}
                                    src={product as string}
                                    alt="Product"
                                    width={40}
                                    height={40}
                                    className="-mr-1.5 size-10 rounded-full border object-cover object-top shadow-xs"
                                 />
                              ))}
                           </div>
                        </td>
                        <td className="px-4 py-2 text-sm">
                           {new Date(post.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2 text-center text-sm">{post.total_likes}</td>
                        <td className="px-4 py-2 text-sm">
                           <PostAction postId={post.id} />
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </DashboardContainer>
   );
}
