"use server";
import path from "path";
import fs from "fs/promises";
import cloudinary from "@/lib/cloudinary";

export async function saveToLocalDirectory(formData: FormData, dest = "images-test") {
   const images = formData.getAll("image") as File[];

   // Exit early if no images are provided
   if (!images?.length) return false;

   try {
      // Create upload directory path and ensure it exists
      const uploadDirectory = path.join(process.cwd(), "public", dest);
      await fs.mkdir(uploadDirectory, { recursive: true });

      // Process images in parallel
      const saveImagePromises = images.map(async (image) => {
         const filePath = path.join(uploadDirectory, image.name);
         const fileBuffer = Buffer.from(await image.arrayBuffer());
         return fs.writeFile(filePath, fileBuffer);
      });

      await Promise.all(saveImagePromises);
      return true;
   } catch (error) {
      console.error("Error saving images:", error);
      return false;
   }
}

export async function uploadImagesToCloudinary(formData: FormData) {
   const images = formData.getAll("image").filter((img) => img instanceof File) as File[];
   const upload_preset = formData.get("upload_preset") as string;

   // Exit early if no images are provided
   if (!images || images.length === 0) {
      return { success: false, message: "No images to upload" };
   }

   try {
      const uploadPromises = images.map(async (img) => {
         // Convert file to a base64 string
         const arrayBuffer = await img.arrayBuffer();
         const base64String = Buffer.from(arrayBuffer).toString("base64");

         // Upload to Cloudinary using the base64 string
         const result = await cloudinary.uploader.upload(
            `data:${img.type};base64,${base64String}`,
            { resource_type: "auto", upload_preset: upload_preset }
         );

         return result.secure_url;
      });

      // Wait for all uploads to complete
      const urls = await Promise.all(uploadPromises);
      return { success: true, urls };
   } catch (error) {
      console.error("Error uploading images:", error);
      return { success: false, message: "Failed to upload images" };
   }
}
