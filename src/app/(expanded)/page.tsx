import Image from "next/image";
import { getFollowedStores, getStores } from "@/actions/store";
import FollowButton from "./FollowButton";

export default async function Home() {
   const stores = await getStores();
   const followedStores = await getFollowedStores();

   return (
      <main className="box-container grid size-full h-screen grid-cols-[18rem_1fr_18rem] gap-4 pt-20">
         <aside className="rounded-xl bg-white p-6">Left Sidebar</aside>

         <main className="rounded-xl bg-white p-6">
            <h1>Homepage</h1>
         </main>

         <aside className="rounded-xl bg-white px-4 py-6">
            <div className="space-y-4">
               <h1 className="text-muted-foreground">Trending Stores</h1>
               <div className="flex flex-col gap-y-4">
                  {stores.map((store) => (
                     <div key={store.id} className="flex items-center">
                        <Image
                           src={store.logo ?? ""}
                           alt={store.name}
                           width={100}
                           height={100}
                           className="size-13 shrink-0 rounded-full"
                        />

                        <p className="mr-auto ml-2 flex flex-col leading-normal">
                           <span className="text-foreground font-bold">{store.name}</span>
                           <span className="text-muted-foreground pl-1 text-sm">@{store.slug}</span>
                        </p>

                        <FollowButton
                           storeId={store.id}
                           isFollowed={followedStores.includes(store.id)}
                        />
                     </div>
                  ))}
               </div>
            </div>
         </aside>
      </main>
   );
}
