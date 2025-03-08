import { cn } from "@/lib/utils";
import React from "react";

const CurlyUnderline: React.FC<React.SVGProps<SVGSVGElement>> = ({ className }) => {
   return (
      <svg
         viewBox="0 0 68 7"
         xmlns="http://www.w3.org/2000/svg"
         className={cn(
            "text-muted-foreground absolute top-full left-1/2 w-full -translate-x-1/2 stroke-current",
            className
         )}
      >
         <path
            d="M1.021 4.03s40.743-7.515 65.96 0C36.64-2.514 20.703 6.313 20.703 6.313"
            fill="none"
            strokeWidth="1.5"
            strokeMiterlimit="0"
            strokeLinecap="round"
            strokeLinejoin="round"
         />
      </svg>
   );
};
export default CurlyUnderline;
