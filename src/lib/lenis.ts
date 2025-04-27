"use client";
import React from "react";
import Lenis, { LenisOptions } from "lenis";

interface ReactLenisProps {
   root?: boolean;
   children: React.ReactNode;
   options?: LenisOptions;
}

export const ReactLenis = ({ children, options, root = true }: ReactLenisProps) => {
   React.useEffect(() => {
      const lenis = new Lenis({ autoRaf: true, ...options });

      const raf = (time: number) => {
         lenis.raf(time);
         requestAnimationFrame(raf);
      };

      requestAnimationFrame(raf);

      return () => {
         lenis.destroy();
      };
   }, [options, root]);

   return children;
};
