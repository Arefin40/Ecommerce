import React from "react";
import DashboardContainer from "@/components/DashboardContainer";
import { getAllMerchantApplications } from "@/actions/merchants";
import ActionMenu from "./ActionMenu";

async function MerchantRequests() {
   const merchantApplications = await getAllMerchantApplications();

   return (
      <DashboardContainer
         title="Merchant Requests"
         description="Here you can see all the merchant requests and approve or reject them."
      >
         <div className="border-border overflow-hidden rounded-md border">
            <table className="min-w-full border-collapse bg-white">
               <thead className="bg-accent">
                  <tr>
                     <th className="text-muted-foreground px-4 py-3 text-left text-sm font-semibold">
                        Merchant Details
                     </th>
                     <th className="text-muted-foreground px-4 py-3 text-left text-sm font-semibold">
                        NID
                     </th>
                     <th className="text-muted-foreground px-4 py-3 text-left text-sm font-semibold">
                        Mobile
                     </th>
                     <th className="text-muted-foreground px-4 py-3 text-left text-sm font-semibold">
                        Status
                     </th>
                     <th className="text-muted-foreground px-4 py-3 text-right text-sm font-semibold">
                        Action
                     </th>
                  </tr>
               </thead>
               <tbody>
                  {merchantApplications.map((row) => (
                     <tr key={row.id} className="hover:bg-accent/50">
                        <td className="px-4 py-2 text-sm">{row.name}</td>
                        <td className="px-4 py-2 text-sm">{row.nid}</td>
                        <td className="px-4 py-2 text-sm">{row.mobile}</td>
                        <td className="px-4 py-2 text-sm">
                           <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                 row.status === "approved"
                                    ? "bg-green-100 text-green-800"
                                    : row.status === "pending"
                                      ? "bg-orange-100 text-orange-800"
                                      : "bg-red-100 text-red-800"
                              }`}
                           >
                              {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                           </span>
                        </td>
                        <td className="px-4 py-2 text-sm">
                           <div className="flex items-center justify-end">
                              <ActionMenu id={row.id} disabled={row.status !== "pending"} />
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </DashboardContainer>
   );
}

export default MerchantRequests;
