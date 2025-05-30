"use server";

import { db } from "@/db";
import { store } from "@/db/schema/store";
import { product, product_images } from "@/db/schema/product";
import { auth } from "@/lib/auth";
import { ProductDBValues } from "@/lib/validation/product";
import { eq, desc, sql } from "drizzle-orm";
import { headers } from "next/headers";

export async function createProduct(data: ProductDBValues) {
   "use server";

   const { images, ...productData } = data;

   // if user is not authenticated, return error
   const session = await auth.api.getSession({ headers: await headers() });
   if (!session?.user) throw new Error("Unauthorized");

   // check if store exists
   const _store = await db.select().from(store).where(eq(store.merchant, session.user.id));
   if (!_store) throw new Error("Store not found");

   // create product
   const newProduct = await db
      .insert(product)
      .values({ storeId: _store[0].id, ...productData })
      .returning();

   // create product images
   if (images) {
      try {
         await Promise.all(
            images.map((image) =>
               db.insert(product_images).values({ product: newProduct[0].id, image })
            )
         );
      } catch {
         // If there's any error, delete the product and throw error
         await db.delete(product).where(eq(product.id, newProduct[0].id));
         throw new Error("Failed to create product images");
      }
   }

   return { success: true, message: "Product created successfully" };
}

export async function getAllProducts() {
   "use server";
   return await db
      .select({
         id: product.id,
         name: product.name,
         price: product.price,
         category: product.category,
         description: product.description,
         stock: product.stock,
         image: product.image,
         isActive: product.isActive,
         total_likes: product.total_likes,
         total_sales: product.total_sales,
         createdAt: product.createdAt,
         store: { slug: store.slug, name: store.name, logo: store.logo }
      })
      .from(product)
      .leftJoin(store, eq(product.storeId, store.id))
      .orderBy(desc(product.createdAt));
}

export async function getMyStoreProducts() {
   "use server";

   try {
      // check if user is authenticated
      const session = await auth.api.getSession({ headers: await headers() });
      if (!session?.user || session.user.role !== "merchant") throw new Error("Unauthorized");

      // check if store exists
      const _store = await db.select().from(store).where(eq(store.merchant, session.user.id));
      if (!_store) throw new Error("Store not found");

      // get products
      const products = await db
         .select()
         .from(product)
         .where(eq(product.storeId, _store[0].id))
         .orderBy(desc(product.createdAt));
      return { success: true, data: products };
   } catch (error) {
      if (error instanceof Error) {
         return { success: false, message: error.message };
      }
      return { success: false, message: "Failed to get products" };
   }
}

export async function getProductById(id: string) {
   "use server";
   const productData = await db
      .select({
         id: product.id,
         name: product.name,
         image: product.image,
         category: product.category,
         description: product.description,
         price: product.price,
         stock: product.stock,
         total_likes: product.total_likes,
         createdAt: product.createdAt,
         isActive: product.isActive,
         store: {
            id: store.id,
            name: store.name,
            logo: store.logo,
            slug: store.slug
         }
      })
      .from(product)
      .where(eq(product.id, id))
      .leftJoin(store, eq(product.storeId, store.id));

   const images = await db.select().from(product_images).where(eq(product_images.product, id));
   return [
      { ...productData[0], images: images.map((img) => img.image), store: productData[0].store }
   ];
}

export async function updateProduct(id: string, data: ProductDBValues) {
   "use server";
   try {
      await db.update(product).set(data).where(eq(product.id, id));
      return { success: true, message: "Product updated successfully" };
   } catch {
      return { success: false, message: "Failed to update product" };
   }
}

export async function deleteProduct(id: string) {
   "use server";
   try {
      await db.delete(product).where(eq(product.id, id));
      return { success: true, message: "Product deleted successfully" };
   } catch {
      return { success: false, message: "Failed to delete product" };
   }
}

export async function getRandomBestSeller() {
   "use server";
   try {
      const products = await db
         .select({
            id: product.id,
            name: product.name,
            image: product.image,
            store: {
               slug: store.slug,
               name: store.name,
               logo: store.logo
            }
         })
         .from(product)
         .leftJoin(store, eq(product.storeId, store.id))
         .orderBy(sql`RANDOM()`)
         .limit(6);

      return { success: true, data: products };
   } catch (error) {
      console.error("Error getting random best sellers:", error);
      return { success: false, error: "Failed to get random products" };
   }
}
