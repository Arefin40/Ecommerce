import { RefObject, useEffect } from "react";

interface ClickOutsideProps {
   ref: RefObject<HTMLElement | null>;
   triggerRef?: RefObject<HTMLElement | null>;
   closeFn: (event: MouseEvent | TouchEvent) => void;
}

export const useClickOutside = ({ ref, triggerRef, closeFn }: ClickOutsideProps) => {
   useEffect(() => {
      const listener = (event: MouseEvent | TouchEvent) => {
         if (
            !ref.current ||
            ref.current.contains(event.target as Node) ||
            (triggerRef && triggerRef.current?.contains(event.target as Node))
         ) {
            return;
         }
         closeFn(event);
      };

      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);

      return () => {
         document.removeEventListener("mousedown", listener);
         document.removeEventListener("touchstart", listener);
      };
   }, [ref, triggerRef, closeFn]);
};
