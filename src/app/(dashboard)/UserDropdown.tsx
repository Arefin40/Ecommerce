"use client";

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { ChevronRight, LifeBuoy, LogOut } from "lucide-react";
import { redirect } from "next/navigation";

const UserDropdown = () => {
   const signOut = async () => {
      await authClient.signOut();
      redirect("/admin");
   };

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <button className="flex-center hover:bg-accent text-muted-foreground hover:text-foreground size-7 shrink-0 rounded-full">
               <ChevronRight className="size-5" />
            </button>
         </DropdownMenuTrigger>

         <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
               <DropdownMenuItem>
                  <LifeBuoy className="text-muted-foreground size-4" />
                  Support
               </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuGroup>
               <DropdownMenuItem asChild>
                  <button className="w-full" onClick={signOut}>
                     <LogOut className="text-muted-foreground size-4" />
                     Logout
                  </button>
               </DropdownMenuItem>
            </DropdownMenuGroup>
         </DropdownMenuContent>
      </DropdownMenu>
   );
};

export default UserDropdown;
