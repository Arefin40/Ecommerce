import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
