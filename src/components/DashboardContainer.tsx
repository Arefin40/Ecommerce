import React from "react";
import { cn } from "@/lib/utils";

type DashboardContainerProps = React.ComponentProps<"main"> & {
   title: string;
   description: string;
};

const DashboardContainer: React.FC<DashboardContainerProps> = ({
   children,
   className,
   title,
   description,
   ...props
}) => {
   return (
      <main className={cn("flex flex-col gap-10 p-6", className)} {...props}>
         <div className="flex flex-col gap-2">
            <h1 className="text-xl font-bold">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
         </div>

         {children}
      </main>
   );
};

export default DashboardContainer;
