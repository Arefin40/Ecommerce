import React from "react";
import Link from "next/link";
import Image from "next/image";
import UserMenu from "@/components/UserMenu";
import Search from "@/components/Search";

async function Header() {
   return (
      <header className="fixed inset-x-0 top-0 z-50 col-span-full flex min-h-16 w-full items-center bg-white shadow">
         <section className="box-container mx-auto grid w-full grid-cols-[18rem_1fr_18rem] items-center gap-x-4">
            {/* Left zone */}
            <div className="flex w-full items-center">
               <Link href="/" className="flex items-center gap-x-2">
                  <Image
                     priority
                     src="/images/Logo.svg"
                     alt="Logo"
                     width={105}
                     height={20}
                     className="h-5"
                  />
               </Link>
            </div>

            {/* Middle zone */}
            <div className="flex-center w-full gap-x-4">
               <Search />
            </div>

            {/* Right zone */}
            <div className="flex w-full items-center justify-end gap-x-4">
               <Link href="/cart">
                  <div className="flex-center size-10 rounded-full bg-gray-200/90 text-gray-800 hover:bg-gray-300/70 hover:text-gray-700 active:scale-90">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 456.569 456.569"
                        className="size-5 fill-current"
                     >
                        <path d="M345.805 339.465c-29.323-.028-53.117 23.72-53.146 53.043s23.72 53.117 53.043 53.146c29.323.028 53.117-23.72 53.146-53.043v-.051c-.028-29.292-23.752-53.038-53.043-53.095zm94.171-254.244a20.44 20.44 0 0 0-3.855-.373H112.845l-5.12-34.253c-3.19-22.748-22.648-39.673-45.619-39.68H20.48C9.169 10.915 0 20.084 0 31.395s9.169 20.48 20.48 20.48h41.677a5.12 5.12 0 0 1 5.12 4.506l31.539 216.166c4.324 27.468 27.951 47.732 55.757 47.821h213.043c26.771.035 49.866-18.78 55.245-45.005l33.331-166.144c2.149-11.105-5.111-21.849-16.216-23.998zM215.737 390.286c-1.247-28.463-24.737-50.869-53.228-50.77-29.299 1.184-52.091 25.896-50.907 55.195 1.136 28.113 24.005 50.458 52.136 50.943h1.28c29.295-1.284 52.002-26.073 50.719-55.368z" />
                     </svg>
                  </div>
               </Link>

               <Link href="/wishlist">
                  <div className="flex-center size-10 rounded-full bg-gray-200/90 text-gray-800 hover:bg-gray-300/70 hover:text-gray-700 active:scale-90">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="size-5 fill-current"
                     >
                        <path d="M482.138 98.556A134.784 134.784 0 0 0 320.806 56.73c-24.78 10.694-46.882 28.723-64.806 52.65-17.924-23.985-40.026-42.015-64.806-52.65A134.784 134.784 0 0 0 29.862 98.556C10.557 123.852.355 155.466.355 189.968c0 49.655 29.613 104.13 88.007 161.975 47.584 47.116 103.815 85.703 133.088 104.505a64.093 64.093 0 0 0 69.1 0c29.25-18.802 85.504-57.389 133.088-104.505 58.394-57.821 88.007-112.32 88.007-161.975 0-34.503-10.202-66.116-29.507-91.412z" />
                     </svg>
                  </div>
               </Link>

               <UserMenu />
            </div>
         </section>
      </header>
   );
}

export default Header;
