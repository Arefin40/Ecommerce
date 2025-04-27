"use server";

import { db } from "@/db";
import { ilike, or, and, eq } from "drizzle-orm";
import { store } from "@/db/schema/store";
import { product } from "@/db/schema/product";

export async function search(query: string) {
   "use server";

   if (!query) return { stores: [], products: [] };
   const searchQuery = `%${query}%`;

   // search for stores including store name and slug
   const stores = await db
      .select({ id: store.slug, name: store.name, image: store.logo })
      .from(store)
      .where(or(ilike(store.name, searchQuery), ilike(store.slug, searchQuery)));

   // search for products including product name, description, and category
   const products = await db
      .select({ id: product.id, name: product.name, image: product.image })
      .from(product)
      .where(
         and(
            or(
               ilike(product.name, searchQuery),
               ilike(product.category, searchQuery),
               ilike(product.description, searchQuery)
            ),
            eq(product.isActive, true)
         )
      );

   return { stores, products };
}
