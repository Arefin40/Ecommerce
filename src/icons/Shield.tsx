import { cn } from "@/lib/utils";
import React from "react";

const Shield: React.FC<React.SVGProps<SVGSVGElement>> = ({ className }) => {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 48 48"
         className={cn("aspect-square size-36 flex-shrink-0 fill-current", className)}
      >
         <linearGradient
            id="a"
            x1="10.283"
            x2="40.474"
            y1="6.752"
            y2="36.943"
            gradientUnits="userSpaceOnUse"
         >
            <stop offset="0" stopColor="#fd9b02" />
            <stop offset="1" stopColor="#ff7302" />
         </linearGradient>
         <linearGradient
            id="b"
            x1="13.518"
            x2="34.932"
            y1="10.958"
            y2="32.372"
            gradientUnits="userSpaceOnUse"
         >
            <stop offset="0" stopColor="#fed200" />
            <stop offset="1" stopColor="#f59815" />
         </linearGradient>
         <path
            fill="url(#a)"
            d="M24 47a1.006 1.006 0 0 1-.3-.045C10.628 42.869 4 30.436 4 10a1 1 0 0 1 .821-.984C4.929 9 15.69 6.982 23.4 1.2a1 1 0 0 1 1.2 0C32.31 6.982 43.071 9 43.179 9.016A1 1 0 0 1 44 10c0 20.436-6.628 32.869-19.7 36.955A1.006 1.006 0 0 1 24 47z"
         />
         <path
            fill="url(#b)"
            d="M24 41.7a1.009 1.009 0 0 1-.37-.071C14.541 38.013 9.785 28.961 9.089 13.958a1 1 0 0 1 .728-1.009 55.906 55.906 0 0 0 13.662-5.775 1 1 0 0 1 1.042 0 55.906 55.906 0 0 0 13.662 5.775 1 1 0 0 1 .728 1.009c-.7 15-5.452 24.055-14.541 27.671a1.009 1.009 0 0 1-.37.071z"
         />
      </svg>
   );
};

export default Shield;
