import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputBaseProps extends React.ComponentProps<"input"> {
   startIcon?: React.ReactNode;
   endIcon?: React.ReactNode;
}

export function InputBase({ name, className, type, startIcon, endIcon, ...props }: InputBaseProps) {
   return (
      <div className="relative w-full">
         {startIcon && (
            <div className="absolute top-1/2 left-3 flex size-5 -translate-y-1/2 items-center justify-center">
               {startIcon}
            </div>
         )}

         <input
            type={type}
            name={name}
            id={name}
            data-slot="input"
            className={cn(
               { "pl-10": startIcon, "pl-3": !startIcon, "pr-10": endIcon, "pr-3": !endIcon },
               "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-11 w-full min-w-0 rounded-md border bg-transparent py-2 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
               "focus-visible:border-ring focus-visible:ring-ring/25 focus-visible:ring-2",
               "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
               className
            )}
            {...props}
         />

         {endIcon && (
            <div className="absolute top-1/2 right-3 flex size-5 -translate-y-1/2 items-center justify-center">
               {endIcon}
            </div>
         )}
      </div>
   );
}
