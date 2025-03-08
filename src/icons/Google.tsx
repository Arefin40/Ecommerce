import React from "react";
import { cn } from "@/lib/utils";

const Google: React.FC<React.SVGProps<SVGSVGElement>> = ({ className }) => {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 24 24"
         className={cn("size-5 fill-current", className)}
      >
         <path
            fill="#fbbb00"
            d="m5.319 14.504-.836 3.119-3.053.064A11.946 11.946 0 0 1 0 12c0-1.99.484-3.866 1.342-5.518l2.719.498 1.19 2.702A7.133 7.133 0 0 0 4.868 12c0 .881.16 1.725.452 2.504z"
         />
         <path
            fill="#518ef8"
            d="M23.79 9.758a12.022 12.022 0 0 1-.053 4.747 11.997 11.997 0 0 1-4.225 6.853l-3.424-.175-.485-3.025a7.152 7.152 0 0 0 3.077-3.653h-6.416V9.758z"
         />
         <path
            fill="#28b446"
            d="M19.512 21.357A11.95 11.95 0 0 1 12 24c-4.57 0-8.543-2.555-10.57-6.314l3.889-3.183a7.135 7.135 0 0 0 10.284 3.654z"
         />
         <path
            fill="#f14336"
            d="m19.66 2.763-3.888 3.182a7.137 7.137 0 0 0-10.52 3.736l-3.91-3.2A11.998 11.998 0 0 1 12 0a11.95 11.95 0 0 1 7.66 2.763z"
         />
      </svg>
   );
};
export default Google;
