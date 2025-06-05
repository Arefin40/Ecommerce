"use client";

import { AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { ReactNode } from "react";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle
} from "./dialog";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

export interface ConfirmDialogProps {
   title?: string;
   description?: string | ReactNode;
   open?: boolean;
   onOpenChange?: (open: boolean) => void;
   onConfirm?: () => void;
   onCancel?: () => void;
   children?: ReactNode;
   variant?: "info" | "warning" | "success" | "danger";
   icon?: ReactNode;
   confirmText?: string;
   cancelText?: string;
   confirmButtonClass?: string;
   cancelButtonClass?: string;
   className?: string;
}

const dialogIconVariants = cva(
   "size-6", // base styles
   {
      variants: {
         variant: {
            success: "text-emerald-500",
            warning: "text-yellow-600",
            danger: "text-destructive",
            info: "text-primary"
         }
      },
      defaultVariants: { variant: "info" }
   }
);

const dialogIconWrapperVariants = cva(
   "flex-center size-12 rounded-full", // base styles
   {
      variants: {
         variant: {
            success: "bg-emerald-50 dark:bg-emerald-950/50",
            warning: "bg-yellow-50 dark:bg-yellow-950/50",
            danger: "bg-destructive/10",
            info: "bg-primary/10"
         }
      },
      defaultVariants: {
         variant: "info"
      }
   }
);

export function ConfirmDialog({
   title = "Are you sure?",
   description = "This action cannot be undone.",
   open,
   onOpenChange,
   onConfirm,
   onCancel,
   children,
   variant = "info",
   icon,
   confirmText = "Confirm",
   cancelText = "Cancel",
   confirmButtonClass,
   cancelButtonClass,
   className
}: ConfirmDialogProps) {
   const handleConfirm = () => {
      onConfirm?.();
      onOpenChange?.(false);
   };

   const handleCancel = () => {
      onCancel?.();
      onOpenChange?.(false);
   };

   const getIcon = () => {
      const iconClass = dialogIconVariants({ variant });
      switch (variant) {
         case "success":
            return <CheckCircle2 className={iconClass} />;
         case "warning":
         case "danger":
            return <AlertTriangle className={iconClass} />;
         default:
            return <Info className={iconClass} />;
      }
   };

   return (
      <Dialog open={open} onOpenChange={onOpenChange}>
         <DialogContent className={cn("sm:max-w-[425px]", className)}>
            <DialogHeader>
               <div className="flex flex-col items-center gap-3">
                  <div className={dialogIconWrapperVariants({ variant })}>{icon || getIcon()}</div>
                  <DialogTitle>{title}</DialogTitle>
               </div>
               {description && (
                  <DialogDescription className="text-center">{description}</DialogDescription>
               )}
            </DialogHeader>

            <main className="text-center">{children}</main>

            <DialogFooter className="gap-2 sm:justify-center">
               <Button
                  variant="outline"
                  onClick={handleCancel}
                  className={cancelButtonClass}
                  data-testid="cancel-button"
               >
                  {cancelText}
               </Button>
               <Button
                  variant={variant === "danger" ? "destructive" : "default"}
                  onClick={handleConfirm}
                  data-testid="confirm-button"
                  className={confirmButtonClass}
               >
                  {confirmText}
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}
