import React from "react";
import DashboardContainer from "@/components/DashboardContainer";
import { TrendingDown, TrendingUp } from "lucide-react";
import { GenderChart } from "@/components/GenderChart";
import { MonthlySales } from "@/components/MonthlySales";
import { cn, formatDate } from "@/lib/utils";
import { MonthlyUsers } from "@/components/MonthlyUsers";
import { getAllOrders } from "@/actions/orders";
import { getStatusBadge } from "@/lib/status-badges";

const stats = {
   revenue: {
      weekly: { title: "Weekly Revenue", value: "$2.302", change: "+20%" },
      monthly: { title: "Monthly Income", value: "$10.000", change: "+15%" },
      yearly: { title: "Annual Income", value: "$120.000", change: "+10%" }
   }
};

async function AdminDashboard() {
   const { data: orders } = await getAllOrders();

   return (
      <DashboardContainer
         title="Dashboard"
         description="Get a snapshot of your business performance"
         className="bg-[#FDFDFD]"
         mainClassName="px-4"
      >
         <section className="grid h-full gap-4 xl:grid-cols-[1fr_20rem]">
            <main className="space-y-4">
               <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-x-4">
                     <StatBlock
                        title={stats.revenue.weekly.title}
                        value={stats.revenue.weekly.value}
                        change={stats.revenue.weekly.change}
                     />
                     <StatBlock
                        title={stats.revenue.monthly.title}
                        value={stats.revenue.monthly.value}
                        change={stats.revenue.monthly.change}
                     />
                     <StatBlock
                        title={stats.revenue.yearly.title}
                        value={stats.revenue.yearly.value}
                        change={stats.revenue.yearly.change}
                     />
                  </div>
               </div>

               <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-x-4">
                     <GenderChart />
                     <MonthlySales />
                  </div>
               </div>

               <div className="border-border bg-card overflow-hidden rounded-lg border shadow">
                  <table className="min-w-full border-collapse text-sm">
                     <thead>
                        <tr>
                           <th className="text-muted-foreground px-4 py-3 text-left text-sm font-medium">
                              Order ID
                           </th>
                           <th className="text-muted-foreground px-4 py-3 text-left text-sm font-medium">
                              Order Date
                           </th>
                           <th className="text-muted-foreground px-4 py-3 text-left text-sm font-medium">
                              Amount
                           </th>
                           <th className="text-muted-foreground px-4 py-3 text-left text-sm font-medium">
                              Status
                           </th>
                        </tr>
                     </thead>
                     <tbody>
                        {orders?.slice(0, 5).map((order) => (
                           <tr
                              key={order.id}
                              className="hover:bg-muted/50 border-t border-gray-100"
                           >
                              <td className="px-4 py-3 font-medium uppercase">
                                 {order.id.slice(-12)}
                              </td>
                              <td className="px-4 py-3">{formatDate(order.orderedAt)}</td>
                              <td className="px-4 py-3">${order.totalPrice}</td>
                              <td className="px-4 py-3">{getStatusBadge(order.status)}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </main>

            <aside className="grid grid-cols-2 gap-4 xl:grid-cols-1">
               <MonthlyUsers />
            </aside>
         </section>
      </DashboardContainer>
   );
}

export default AdminDashboard;

function StatBlock({ title, value, change }: Record<string, string>) {
   return (
      <div className="space-y-2 rounded-xl border p-4 text-sm shadow">
         <div className="flex items-center justify-between gap-x-2">
            <h2 className="text-2xl font-bold">{value}</h2>
            <div
               className={cn(
                  "flex items-center gap-x-1 text-base font-semibold",
                  { "text-emerald-500": change.startsWith("+") },
                  { "text-rose-500": change.startsWith("-") }
               )}
            >
               {change.startsWith("+") ? (
                  <TrendingUp className="size-4" />
               ) : (
                  <TrendingDown className="size-4" />
               )}
               <span>{change.replace("%", "")}%</span>
            </div>
         </div>
         <span className="text-muted-foreground">{title}</span>
      </div>
   );
}
