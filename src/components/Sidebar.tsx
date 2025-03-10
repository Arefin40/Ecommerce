"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useClickOutside } from "@/hooks";
import { authClient } from "@/lib/auth-client";
import { EllipsisVertical } from "lucide-react";
import { Home, User, Cart, Shop, Wishlist, Orders, LogOut } from "@/icons";

const NavigationMenu = {
   user: [
      { label: "Home", icon: Home, href: "/" },
      { label: "Profile", icon: User, href: "/profile" },
      { label: "Cart", icon: Cart, href: "/cart" },
      { label: "Marketplace", icon: Shop, href: "/products" },
      { label: "Wishlist", icon: Wishlist, href: "/wishlist" },
      { label: "Orders", icon: Orders, href: "/orders" }
   ]
};

function Sidebar() {
   const { data: session } = authClient.useSession();
   const [isOpen, setIsOpen] = React.useState(false);
   const ref = React.useRef<HTMLUListElement>(null);
   const triggerRef = React.useRef<HTMLButtonElement>(null);
   const closeFn = () => setIsOpen(false);

   const logOut = async () => await authClient.signOut();
   useClickOutside({ ref, triggerRef, closeFn });

   return (
      <aside className="fixed inset-y-0 left-0 z-10 flex h-screen w-80 flex-col gap-y-10 py-10 text-gray-800">
         <div className="px-10">
            <Link href="/" className="flex items-center gap-x-2">
               <Image src="/images/Logo.svg" alt="Logo" width={105} height={20} className="h-5" />
            </Link>
         </div>

         <ul className="grid px-7 text-lg font-semibold">
            {NavigationMenu.user.map((menu) => (
               <li key={menu.href}>
                  <Link
                     href={menu.href}
                     className="text-foreground group inline-flex items-center rounded-full p-3 hover:bg-white/50"
                  >
                     <menu.icon />
                     <span className="mr-4 ml-5 block">{menu.label}</span>
                  </Link>
               </li>
            ))}
         </ul>

         <div className="mt-auto px-7">
            {session?.user ? (
               <div className="shadow-card bg-background relative flex w-full items-center gap-x-3 rounded-xl p-3">
                  <Image
                     src={session.user.image || "/images/user.png"}
                     width="44"
                     height="44"
                     alt="Profile Picture"
                     className="border-border size-11 flex-shrink-0 rounded-full border"
                  />

                  <div className="w-full space-y-1 text-left leading-none">
                     <p className="font-semibold">{session.user.name}</p>
                     <p className="text-muted-foreground text-sm">Account Settings</p>
                  </div>

                  <button
                     ref={triggerRef}
                     onClick={() => setIsOpen((prev) => !prev)}
                     className="flex size-9 flex-shrink-0 items-center justify-center rounded-full bg-gray-50 transition-all active:scale-75"
                  >
                     <EllipsisVertical className="size-5" />
                  </button>

                  {/* Menu */}
                  <ul
                     ref={ref}
                     className={cn(
                        "shadow-card animate-scale-in absolute inset-x-0 bottom-[calc(100%+0.5rem)] origin-bottom rounded-lg bg-white p-2",
                        { hidden: !isOpen }
                     )}
                  >
                     <li>
                        <button
                           onClick={logOut}
                           className="hover:bg-accent group inline-flex w-full items-center gap-x-4 rounded-md px-2 py-1"
                        >
                           <div className="flex-center size-9 rounded-full bg-gray-100">
                              <LogOut className="size-5" />
                           </div>
                           <span>Logout</span>
                        </button>
                     </li>
                  </ul>
               </div>
            ) : (
               <div className="flex items-center gap-x-3">
                  <a
                     href="{% url 'login' %}"
                     className="bg-primary text-primary-foreground flex-center border-primary w-full rounded-full border px-4 py-2"
                  >
                     Log in
                  </a>
                  <a
                     href="{% url 'register' %}"
                     className="text-muted-foreground flex-center w-full rounded-full border border-orange-100 bg-white px-4 py-2"
                  >
                     Register
                  </a>
               </div>
            )}
         </div>
      </aside>
   );
}

export default Sidebar;
