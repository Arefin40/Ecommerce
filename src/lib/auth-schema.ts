import { z } from "zod";

export const signUpSchema = z
   .object({
      fname: z.string().trim().min(1, { message: "First name is required." }),
      lname: z.string().trim().min(1, { message: "Last name is required." }),
      email: z
         .string()
         .trim()
         .min(1, { message: "Email is required." })
         .email({ message: "Invalid email address" }),
      password: z
         .string()
         .min(1, { message: "Password is required." })
         .min(8, { message: "Password must be at least 8 characters long." }),
      confirmPassword: z.string().min(1, { message: "Confirm password is required." })
   })
   .superRefine(({ password, confirmPassword }, ctx) => {
      if (password !== confirmPassword) {
         ctx.addIssue({
            code: "custom",
            path: ["confirmPassword"],
            message: "Passwords do not match"
         });
      }
   });

export const logInSchema = z.object({
   email: z
      .string()
      .trim()
      .min(1, { message: "Email is required." })
      .email({ message: "Invalid email address" }),
   password: z
      .string()
      .min(1, { message: "Password is required." })
      .min(8, { message: "Password must be at least 8 characters long." })
});

export const resetPasswordSchema = z
   .object({
      password: z
         .string()
         .min(1, { message: "Password is required." })
         .min(8, { message: "Password must be at least 8 characters long." }),
      confirmPassword: z.string().min(1, { message: "Confirm password is required." })
   })
   .superRefine(({ password, confirmPassword }, ctx) => {
      if (password !== confirmPassword) {
         ctx.addIssue({
            code: "custom",
            path: ["confirmPassword"],
            message: "Passwords do not match"
         });
      }
   });

export const updateProfileSchema = z.object({
   image: z
      .any()
      .optional()
      .transform((files) => {
         if (!files || files.length === 0) return null;

         for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
            const validSize = 2 * 1024 * 1024;
            if (file.size <= validSize && validTypes.includes(file.type)) return file;
         }

         return null;
      })
      .refine((file) => !file || file.size <= 2 * 1024 * 1024, "Image must be less than 2MB")
      .refine(
         (file) =>
            !file || ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type),
         "Only .jpg, .jpeg, .png and .webp formats are supported"
      ),
   name: z
      .string()
      .trim()
      .min(1, { message: "Full name is required." })
      .min(2, { message: "Name must be at least 2 characters long." }),
   email: z
      .string()
      .trim()
      .min(1, { message: "Email is required." })
      .email({ message: "Invalid email address" })
});
