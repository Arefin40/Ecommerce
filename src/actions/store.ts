"use server";

import { db } from "@/db";
import { and, eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { store, store_followers } from "@/db/schema/store";
import { revalidatePath } from "next/cache";
import { type StoreFormValues } from "@/lib/validation/merchant";

export async function createStore(data: StoreFormValues) {
   "use server";

   const session = await auth.api.getSession({ headers: await headers() });
   if (!session?.user) throw new Error("Unauthorized");

   const { name, slug, description, logo, cover } = data;
   const existingStore = await db.select().from(store).where(eq(store.merchant, session.user.id));

   if (existingStore.length > 0) throw new Error("Store already exists");

   const newStore = await db
      .insert(store)
      .values({ merchant: session.user.id, name, slug, description, logo, cover })
      .returning();

   revalidatePath("/stores");
   return { success: true, data: newStore[0] };
}

export async function getStores() {
   "use server";
   return await db.select().from(store);
}

export async function getFollowedStores() {
   "use server";

   const session = await auth.api.getSession({ headers: await headers() });
   if (!session?.user) return [];

   const followedStores = await db
      .select({ storeId: store_followers.store })
      .from(store_followers)
      .where(eq(store_followers.follower, session.user.id));

   return followedStores.map((store) => store.storeId);
}

export async function getStore(slug: string) {
   "use server";
   return await db.select().from(store).where(eq(store.slug, slug));
}

export async function toggleFollowStore(storeId: string, invalidatePath: string) {
   "use server";

   const session = await auth.api.getSession({ headers: await headers() });
   if (!session?.user) throw new Error("Unauthorized");

   const storeData = await db.select().from(store).where(eq(store.id, storeId));
   if (storeData.length === 0) throw new Error("Store not found");

   const existingFollow = await db
      .select()
      .from(store_followers)
      .where(
         and(eq(store_followers.store, storeId), eq(store_followers.follower, session.user.id))
      );

   if (existingFollow.length > 0) {
      // unfollow the store
      await db
         .delete(store_followers)
         .where(
            and(eq(store_followers.store, storeId), eq(store_followers.follower, session.user.id))
         );
   } else {
      // follow the store
      await db.insert(store_followers).values({
         store: storeId,
         follower: session.user.id
      });
   }

   revalidatePath(invalidatePath);
}
