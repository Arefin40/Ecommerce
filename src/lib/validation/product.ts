import { z } from "zod";
import { getImageSchema } from "../utils";

export const productFormSchema = z.object({
   name: z.string().min(1, "Name is required"),
   category: z.string().min(1, "Category is required"),
   description: z.string().min(1, "Description is required"),
   price: z.coerce.number().min(1, "Price must be at least 1 Tk."),
   stock: z.coerce.number().min(0, "Stock cannot be negative"),
   image: getImageSchema(2 * 1024 * 1024, true),
   images: z.any().optional()
});

export const productDBSchema = z.object({
   name: z.string().min(1, "Name is required"),
   category: z.string().min(1, "Category is required"),
   description: z.string().min(1, "Description is required"),
   price: z.coerce.number().min(1, "Price must be at least 1 Tk."),
   stock: z.coerce.number().min(0, "Stock cannot be negative"),
   image: z.string().url(),
   images: z.array(z.string().url()).optional()
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
export type ProductDBValues = z.infer<typeof productDBSchema>;
