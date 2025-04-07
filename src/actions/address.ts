"use server";

import { db } from "@/db";
import { eq, and } from "drizzle-orm";
import { address, zone, area } from "@/db/schema/users";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { type AddressFormData, addressSchema } from "@/lib/validation/address";

export async function fetchAllZones() {
   "use server";
   try {
      return await db.select().from(zone);
   } catch (error) {
      console.error("Error fetching zones:", error);
      return [];
   }
}

export async function fetchAreasByZone(zoneId: number | string) {
   "use server";
   if (typeof zoneId === "string") zoneId = parseInt(zoneId);
   try {
      const areas = await db.select().from(area).where(eq(area.zone, zoneId));
      return areas.map((area) => ({
         value: area.id.toString(),
         label: area.name
      }));
   } catch (error) {
      console.error("Error fetching areas:", error);
      return [];
   }
}

export async function fetchUserAddresses() {
   "use server";
   // Check if user is authenticated
   const session = await auth.api.getSession({ headers: await headers() });
   if (!session) return { success: false, error: "Unauthorized Access" };

   try {
      const addresses = await db
         .select({
            id: address.id,
            label: address.name,
            address: address.address,
            contact: address.contact,
            zone: zone.name,
            zoneId: address.zone,
            area: area.name,
            areaId: address.area
         })
         .from(address)
         .where(eq(address.userId, session.user.id))
         .leftJoin(zone, eq(address.zone, zone.id))
         .leftJoin(area, eq(address.area, area.id));

      return { success: true, data: addresses };
   } catch (error) {
      console.error("Error fetching user addresses:", error);
      return { success: false, error: "Failed to fetch addresses" };
   }
}

export async function createAddress(data: AddressFormData) {
   "use server";

   // Check if user is authenticated
   const session = await auth.api.getSession({ headers: await headers() });
   if (!session) return { success: false, error: "Unauthorized Access" };

   // Validate input data using addressSchema
   const validationResult = addressSchema.safeParse(data);

   if (!validationResult.success) {
      return {
         success: false,
         message: "Validation failed",
         details: validationResult.error.flatten()
      };
   }

   data = validationResult.data;

   // Check if address already exists
   const existingAddress = await db
      .select()
      .from(address)
      .where(
         and(
            eq(address.address, data.address),
            eq(address.contact, data.contact),
            eq(address.userId, session.user.id),
            eq(address.zone, parseInt(data.zone)),
            eq(address.area, parseInt(data.area))
         )
      );

   if (existingAddress.length > 0) return { success: false, error: "Address already exists" };

   // Insert new address into the database
   try {
      await db.insert(address).values({
         name: data.label,
         address: data.address,
         contact: data.contact,
         userId: session.user.id,
         zone: parseInt(data.zone),
         area: parseInt(data.area)
      });

      revalidatePath("/profile");
      return { success: true, message: "Address saved successfully" };
   } catch (error) {
      console.error("Error creating address:", error);
      return { success: false, error: "Failed to create address" };
   }
}

export async function deleteAddress(addressId: string) {
   "use server";
   // Check if user is authenticated
   const session = await auth.api.getSession({ headers: await headers() });
   if (!session) return { success: false, error: "Unauthorized Access" };

   // Delete the address
   try {
      const result = await db
         .delete(address)
         .where(and(eq(address.id, addressId), eq(address.userId, session.user.id)))
         .returning({ id: address.id });

      if (result.length === 0) return { success: false, error: "Failed to delete address" };
      revalidatePath("/profile");

      return { success: true, message: "Address deleted successfully" };
   } catch (error) {
      console.error("Error deleting address:", error);
      return { success: false, error: "Failed to delete address" };
   }
}

export async function updateAddress(addressId: string, data: AddressFormData) {
   "use server";

   // Check if user is authenticated
   const session = await auth.api.getSession({ headers: await headers() });
   if (!session) return { success: false, error: "Unauthorized Access" };

   // Validate input data
   const validationResult = addressSchema.safeParse(data);
   if (!validationResult.success) return { success: false, error: "Invalid address data" };
   data = validationResult.data;

   try {
      const result = await db
         .update(address)
         .set({
            name: data.label,
            address: data.address,
            contact: data.contact,
            zone: parseInt(data.zone),
            area: parseInt(data.area)
         })
         .where(and(eq(address.id, addressId), eq(address.userId, session.user.id)))
         .returning({ id: address.id });

      if (result.length === 0) return { success: false, error: "Address not found" };
      revalidatePath("/profile");
      return { success: true, message: "Address updated successfully" };
   } catch (error) {
      console.error("Error updating address:", error);
      return { success: false, error: "Failed to update address" };
   }
}
