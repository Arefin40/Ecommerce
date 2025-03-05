"use client";

import type { FieldError } from "react-hook-form";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { Label } from "./label";
import { InputBase, InputBaseProps } from "./input-base";

interface InputProps extends InputBaseProps {
   label?: string;
   labelClass?: string;
   description?: string;
   descriptionClass?: string;
   error?: FieldError;
}

export function Input({
   name,
   label,
   labelClass,
   description,
   descriptionClass,
   error,
   ...props
}: InputProps) {
   return (
      <div className="grow space-y-2.5">
         {label && (
            <Label htmlFor={name} className={labelClass}>
               {label}
            </Label>
         )}

         <InputBase name={name} {...props} />

         {description && <p className={cn("text-muted-foreground text-sm", descriptionClass)} />}

         {error && <span className="text-destructive text-sm">{error.message}</span>}
      </div>
   );
}

export function InputPassword({
   name,
   label,
   labelClass,
   description,
   descriptionClass,
   error,
   ...props
}: InputProps) {
   const [showPassword, setShowPassword] = React.useState(false);

   return (
      <div className="grow space-y-2.5">
         {label && (
            <Label htmlFor={name} className={labelClass}>
               {label}
            </Label>
         )}

         <InputBase
            {...props}
            type={showPassword ? "text" : "password"}
            name={name}
            id={name}
            endIcon={
               <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-1/2 right-3 flex size-5 -translate-y-1/2 items-center justify-center"
               >
                  {showPassword ? (
                     <Eye className="text-muted-foreground size-4" />
                  ) : (
                     <EyeOff className="text-muted-foreground size-4 -scale-x-100" />
                  )}
               </button>
            }
         />

         {description && <p className={cn("text-muted-foreground text-sm", descriptionClass)} />}

         {error && <span className="text-destructive text-sm">{error.message}</span>}
      </div>
   );
}
