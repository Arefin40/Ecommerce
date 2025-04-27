"use server";

import { db } from "@/db";
import { eq, sql } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { store } from "@/db/schema/store";
import { revalidatePath } from "next/cache";
import { product } from "@/db/schema/product";
import { post, post_products, post_likes } from "@/db/schema/social";

export async function createPost(data: { content: string; image?: string; products: string[] }) {
   "use server";
   try {
      // Check if user is authenticated
      const session = await auth.api.getSession({ headers: await headers() });
      if (!session?.user || session.user.role !== "merchant") throw new Error("Unauthorized");

      // Check if the merchant has a store
      const _store = await db
         .select()
         .from(store)
         .where(eq(store.merchant, session.user.id))
         .limit(1);
      if (_store.length === 0) throw new Error("Store not found");

      // Create the post
      const _post = await db
         .insert(post)
         .values({ store: _store[0].id, content: data.content, total_likes: 0 })
         .returning();

      if (_post.length === 0) throw new Error("Failed to create post");

      // Create post products
      await db
         .insert(post_products)
         .values(data.products.map((product) => ({ post: _post[0].id, product })));

      revalidatePath("/posts");
      return { success: true, message: "Post created successfully" };
   } catch (error) {
      console.error("Error creating post:", error);
      return { success: false, error: "Failed to create post" };
   }
}

export async function getAllPosts() {
   "use server";
   try {
      const _posts = await db.select().from(post).leftJoin(store, eq(post.store, store.id));

      const postsWithProducts = await Promise.all(
         _posts.map(async ({ post, store: _store }) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { store, ...restPost } = post;

            const _products = await db
               .select({ image: product.image })
               .from(post_products)
               .where(eq(post_products.post, post.id))
               .leftJoin(product, eq(post_products.product, product.id));
            return {
               ...restPost,
               store: { name: _store?.name, slug: _store?.slug, logo: _store?.logo as string },
               products: _products.map((product) => product.image)
            };
         })
      );

      return { success: true, data: postsWithProducts };
   } catch (error) {
      console.error("Error getting all posts:", error);
      return { success: false, error: "Failed to get all posts" };
   }
}

export async function getPostById(id: string) {
   "use server";
   try {
      const _post = await db.select().from(post).where(eq(post.id, id));
      if (_post.length === 0) throw new Error("Post not found");

      const _products = await db
         .select({ id: product.id, image: product.image })
         .from(post_products)
         .where(eq(post_products.post, id))
         .leftJoin(product, eq(post_products.product, product.id));

      return {
         success: true,
         data: { ..._post[0], products: _products.map((product) => product.id as string) }
      };
   } catch (error) {
      console.error("Error getting post by id:", error);
      return { success: false, error: "Failed to get post by id" };
   }
}

export async function updatePost(
   id: string,
   data: { content: string; image?: string; products?: string[] }
) {
   "use server";
   try {
      // Check if user is authenticated
      const session = await auth.api.getSession({ headers: await headers() });
      if (!session?.user || session.user.role !== "merchant") throw new Error("Unauthorized");

      // Check if the post belongs to the store
      const _post = await db.select().from(post).where(eq(post.id, id));
      if (_post.length === 0) throw new Error("Post not found");

      // Check if the the merchant has a store
      const _store = await db
         .select()
         .from(store)
         .where(eq(store.merchant, session.user.id))
         .limit(1);
      if (_store.length === 0) throw new Error("Store not found");
      if (_post[0].store !== _store[0].id) throw new Error("Post not belongs to your store");

      // Update the post
      await db.update(post).set({ content: data.content }).where(eq(post.id, id));

      // Update the post products
      await db.delete(post_products).where(eq(post_products.post, id));
      if (data.products) {
         await db
            .insert(post_products)
            .values(data.products.map((product) => ({ post: id, product })));
      }

      revalidatePath("/posts");
      return { success: true, message: "Post updated successfully" };
   } catch (error) {
      console.error("Error updating post:", error);
      return { success: false, error: "Failed to update post" };
   }
}

export async function deletePost(id: string) {
   "use server";
   try {
      const session = await auth.api.getSession({ headers: await headers() });
      if (!session?.user || session.user.role !== "merchant") throw new Error("Unauthorized");

      // Check if the the merchant has a store
      const _store = await db
         .select()
         .from(store)
         .where(eq(store.merchant, session.user.id))
         .limit(1);
      if (_store.length === 0) throw new Error("Store not found");

      // Check if the post belongs to the store
      const _post = await db.select().from(post).where(eq(post.id, id));
      if (_post.length === 0) throw new Error("Post not found");
      if (_post[0].store !== _store[0].id) throw new Error("Post not belongs to your store");

      // Delete the post
      await db.delete(post).where(eq(post.id, id));

      revalidatePath("/posts");
      return { success: true, message: "Post deleted successfully" };
   } catch (error) {
      console.error("Error deleting post:", error);
      return { success: false, error: "Failed to delete post" };
   }
}

export async function getPostsMyStorePosts() {
   "use server";
   try {
      // Check if user is authenticated
      const session = await auth.api.getSession({ headers: await headers() });
      if (!session?.user) throw new Error("Unauthorized");

      // Check if the user has a store
      const _store = await db
         .select()
         .from(store)
         .where(eq(store.merchant, session.user.id))
         .limit(1);
      if (_store.length === 0) throw new Error("Store not found");

      // Get the posts of the store
      const _posts = await db.select().from(post).where(eq(post.store, _store[0].id));

      // Get the products of the posts
      const postsWithProducts = await Promise.all(
         _posts.map(async (post) => {
            const _products = await db
               .select({ image: product.image })
               .from(post_products)
               .where(eq(post_products.post, post.id))
               .leftJoin(product, eq(post_products.product, product.id));
            return { ...post, products: _products.map((product) => product.image) };
         })
      );

      return { success: true, data: postsWithProducts };
   } catch (error) {
      console.error("Error getting posts by store:", error);
      return { success: false, error: "Failed to get posts by store" };
   }
}

export async function toggleLikePost(postId: string) {
   "use server";
   try {
      // Check if user is authenticated
      const session = await auth.api.getSession({ headers: await headers() });
      if (!session?.user) throw new Error("Unauthorized");

      // Check if the post exists
      const _post = await db.select().from(post).where(eq(post.id, postId));
      if (_post.length === 0) throw new Error("Post not found");

      // Check if the user has already liked the post
      const _like = await db.select().from(post_likes).where(eq(post_likes.post, postId));

      if (_like.length > 0) {
         // Delete the like
         await db.delete(post_likes).where(eq(post_likes.post, postId));
         await db
            .update(post)
            .set({ total_likes: sql`total_likes - 1` })
            .where(eq(post.id, postId));
      } else {
         // Create the like
         await db.insert(post_likes).values({ post: postId, user: session.user.id });
         await db
            .update(post)
            .set({ total_likes: sql`total_likes + 1` })
            .where(eq(post.id, postId));
      }

      revalidatePath("/");
      return { success: true, message: "Post liked successfully" };
   } catch (error) {
      console.error("Error toggling like post:", error);
      return { success: false, error: "Failed to toggle like post" };
   }
}

export async function getLinkedPost() {
   "use server";

   const session = await auth.api.getSession({ headers: await headers() });
   if (!session?.user) return [];

   const linkedPosts = await db
      .select()
      .from(post_likes)
      .where(eq(post_likes.user, session.user.id));

   return linkedPosts.map((post) => post.post);
}
