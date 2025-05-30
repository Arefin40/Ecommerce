import React from "react";
import { cn } from "@/lib/utils";

type DashboardContainerProps = React.ComponentProps<"main"> & {
   title: string;
   description: string;
   mainClassName?: string;
   actions?: React.ReactNode;
};

const DashboardContainer: React.FC<DashboardContainerProps> = ({
   children,
   className,
   title,
   description,
   mainClassName,
   actions,
   ...props
}) => {
   return (
      <main className={cn("scroll-hide flex flex-col overflow-y-auto pb-6", className)} {...props}>
         <header className="sticky top-0 flex items-center justify-between bg-white/75 p-6 backdrop-blur-3xl">
            <div className="flex flex-col gap-2">
               <h1 className="text-xl font-bold">{title}</h1>
               <p className="text-muted-foreground">{description}</p>
            </div>

            {actions}
         </header>

         <main className={cn("flex-1 px-6", mainClassName)}>{children}</main>
      </main>
   );
};

export default DashboardContainer;
