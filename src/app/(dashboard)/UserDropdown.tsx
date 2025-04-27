"use client";

import Image from "next/image";
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
   const { data: session } = authClient.useSession();
   const signOut = async () => {
      await authClient.signOut();
      redirect("/admin");
   };

   return (
      <div className="border-border flex items-center justify-between border-t py-5">
         <div className="flex items-center gap-3">
            <Image
               priority
               src={session?.user.image || "/images/user.png"}
               alt="Logo"
               width={40}
               height={40}
               className="size-10 shrink-0 rounded-full"
            />

            <div className="">
               <h4 className="font-semibold">{session?.user.name}</h4>
               <p className="text-muted-foreground text-xs">{session?.user.email}</p>
            </div>
         </div>

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
      </div>
   );
};

export default UserDropdown;
