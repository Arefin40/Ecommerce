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
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { useSession } from "@/context/session";
import { useQuery } from "@tanstack/react-query";
import { getMyStore } from "@/actions/store";
import { ChevronRight, LifeBuoy, LogOut, Store } from "lucide-react";

const UserDropdown = () => {
   const { user } = useSession();

   const { data: store } = useQuery({
      queryKey: ["store", user?.id],
      queryFn: getMyStore,
      enabled: !!user?.id && user?.role === "merchant"
   });

   const signOut = async () => {
      await authClient.signOut();
      if (user?.role === "admin") {
         redirect("/admin");
      } else if (user?.role === "merchant") {
         redirect("/merchant");
      } else {
         redirect("/login");
      }
   };

   return (
      <div className="border-border flex items-center justify-between border-t py-5">
         {user?.role === "merchant" ? (
            store ? (
               <div className="flex items-center gap-3">
                  <Image
                     priority
                     src={store.logo || "/placeholder-logo.jpg"}
                     alt="Store Logo"
                     width={40}
                     height={40}
                     className="size-10 shrink-0 rounded-full"
                  />

                  <div>
                     <Link href={`/stores/${store.slug}`} className="font-semibold">
                        {store.name}
                     </Link>
                     <p className="text-muted-foreground text-xs">@{store.slug}</p>
                  </div>
               </div>
            ) : (
               <div className="flex items-center gap-3">
                  <div className="bg-muted flex-center size-10 shrink-0 rounded-full">
                     <Store className="text-muted-foreground size-5" />
                  </div>

                  <div>
                     <Link href="/stores/create" className="text-primary hover:text-primary/90">
                        <h4 className="font-semibold">Create Store</h4>
                     </Link>
                     <p className="text-muted-foreground text-xs">Start selling today</p>
                  </div>
               </div>
            )
         ) : (
            <div className="flex items-center gap-3">
               <Image
                  priority
                  src={user?.image || "/images/user.png"}
                  alt="Logo"
                  width={40}
                  height={40}
                  className="size-10 shrink-0 rounded-full"
               />

               <div>
                  <h4 className="font-semibold">{user?.name}</h4>
                  <p className="text-muted-foreground text-xs">{user?.email}</p>
               </div>
            </div>
         )}

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
