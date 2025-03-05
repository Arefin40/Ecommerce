import React from "react";
import { cn } from "@/lib/utils";

function FormSeparator({ className, children }: React.ComponentProps<"span">) {
   return (
      <div className="flex-center relative">
         <span className="border-input absolute inset-x-0 top-1/2 -translate-y-1/2 border-t" />
         <span
            className={cn(
               "bg-background text-muted-foreground relative px-2 text-xs font-medium uppercase",
               className
            )}
         >
            {children}
         </span>
      </div>
   );
}

export { FormSeparator };
