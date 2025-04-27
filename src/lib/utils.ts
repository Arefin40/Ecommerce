import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

export function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]): React.RefCallback<T> {
   return (value) => {
      refs.forEach((ref) => {
         if (typeof ref === "function") {
            ref(value);
         } else if (ref && typeof ref === "object") {
            (ref as React.RefObject<T | null>).current = value;
         }
      });
   };
}

export const getImageSchema = (maxSize: number = 2 * 1024 * 1024, isRequired = false) => {
   const schema = isRequired ? z.any() : z.any().optional();

   return schema
      .transform((files) => {
         if (!files?.length) return null;
         const file = files[0];
         const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
         return file.size <= maxSize && validTypes.includes(file.type) ? file : null;
      })
      .refine((file) => !file || file.size <= maxSize, `Image must be less than ${maxSize}MB`)
      .refine(
         (file) =>
            !file || ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type),
         "Only .jpg, .jpeg, .png and .webp formats are supported"
      );
};
