"use server";

import { db } from "@/db";
import { ilike, or, and, eq, desc } from "drizzle-orm";
import { store } from "@/db/schema/store";
import { product } from "@/db/schema/product";

export async function search(q: string) {
   "use server";
   if (!q) return { stores: [], products: [] };
   const s = `%${q}%`;

   const stores = await db
      .select({ id: store.slug, name: store.name, image: store.logo })
      .from(store)
      .where(or(ilike(store.name, s), ilike(store.slug, s)))
      .orderBy(desc(store.totalFollowers))
      .limit(5);

   const products = await db
      .select({ id: product.id, name: product.name, image: product.image })
      .from(product)
      .where(
         and(
            or(ilike(product.name, s), ilike(product.category, s), ilike(product.description, s)),
            eq(product.isActive, true)
         )
      )
      .orderBy(desc(product.total_sales))
      .limit(5);

   return { stores, products };
}
