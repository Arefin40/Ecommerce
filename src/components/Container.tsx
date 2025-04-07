import { cn } from "@/lib/utils";
import React from "react";

function Container({ className, children, ...props }: React.ComponentProps<"main">) {
   return (
      <main className={cn("size-full h-screen pt-20", className)} {...props}>
         {children}
      </main>
   );
}

export default Container;
