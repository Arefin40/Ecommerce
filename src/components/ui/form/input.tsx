"use client";

import type { FieldError } from "react-hook-form";
import * as React from "react";
import Link from "next/link";
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
   className,
   ...props
}: InputProps) {
   return (
      <div className={cn("grow space-y-2.5", className)}>
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

interface InputPasswordProps extends InputProps {
   forgotPasswordUrl?: string;
   forgotPasswordLabelClass?: string;
}

export function InputPassword({
   name,
   label,
   labelClass,
   description,
   descriptionClass,
   error,
   className,
   forgotPasswordUrl,
   forgotPasswordLabelClass,
   ...props
}: InputPasswordProps) {
   const [showPassword, setShowPassword] = React.useState(false);

   return (
      <div className={cn("grow space-y-2.5", className)}>
         {label && (
            <div className={cn("flex", { "items-center justify-between": forgotPasswordUrl })}>
               <Label htmlFor={name} className={labelClass}>
                  {label}
               </Label>

               {forgotPasswordUrl && (
                  <Link
                     href={forgotPasswordUrl}
                     className={cn("text-xs font-semibold text-blue-600", forgotPasswordLabelClass)}
                  >
                     Forgot Password?
                  </Link>
               )}
            </div>
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
