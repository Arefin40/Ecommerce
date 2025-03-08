import { cn } from "@/lib/utils";

export default function BackgroundGradients({ className }: React.ComponentProps<"div">) {
   return (
      <div className={cn("fixed inset-0 -z-50 h-screen w-screen overflow-hidden", className)}>
         <div className="absolute top-1/2 left-1/2 -z-50 size-48 flex-shrink-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-300 md:size-72 lg:size-80 xl:size-[32rem]"></div>
         <div className="absolute top-0 left-0 -z-50 size-48 flex-shrink-0 -translate-x-[30%] -translate-y-[21.5%] rounded-full bg-blue-300 md:size-72 lg:size-80 xl:size-[32rem]"></div>
         <div className="absolute top-0 left-1/2 -z-50 hidden flex-shrink-0 -translate-x-1/2 -translate-y-[46.875%] rounded-full bg-teal-100 lg:block lg:size-80 xl:size-[32rem]"></div>
         <div className="absolute top-0 right-0 -z-50 size-48 flex-shrink-0 translate-x-[30%] -translate-y-[32%] rounded-full bg-green-400 md:size-72 lg:size-80 xl:size-[32rem]"></div>
         <div className="absolute bottom-0 left-0 -z-50 size-48 flex-shrink-0 -translate-x-[12.5%] translate-y-[22.65%] rounded-full bg-orange-200 md:size-72 lg:size-80 xl:size-[32rem]"></div>
         <div className="absolute right-0 bottom-0 -z-50 size-48 flex-shrink-0 translate-x-[30.45%] translate-y-[46.875%] rounded-full bg-violet-500 md:size-72 lg:size-80 xl:size-[32rem]"></div>
         <div className="fixed inset-0 -z-40 bg-white/75 backdrop-blur-[90px]"></div>
      </div>
   );
}
