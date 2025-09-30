"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
   ChartConfig,
   ChartContainer,
   ChartTooltip,
   ChartTooltipContent
} from "@/components/ui/chart";

export const description = "A simple area chart";

const adminChartData = [
   { month: "January", sales: 186 },
   { month: "February", sales: 305 },
   { month: "March", sales: 237 },
   { month: "April", sales: 73 },
   { month: "May", sales: 209 },
   { month: "June", sales: 214 }
];
const merchantChartData = [
   { month: "January", sales: 0 },
   { month: "February", sales: 0 },
   { month: "March", sales: 0 },
   { month: "April", sales: 0 },
   { month: "May", sales: 0 },
   { month: "June", sales: 1 }
];

const chartConfig = {
   sales: {
      label: "Sales",
      color: "var(--chart-1)"
   }
} satisfies ChartConfig;

export function MonthlySales({ role = "merchant" }: { role: "admin" | "merchant" }) {
   return (
      <Card>
         <CardHeader>
            <CardTitle>Monthly Sales</CardTitle>
            <CardDescription>Showing total sales for the last 6 months</CardDescription>
         </CardHeader>
         <CardContent>
            <ChartContainer config={chartConfig}>
               <AreaChart
                  accessibilityLayer
                  data={role === "merchant" ? merchantChartData : adminChartData}
                  margin={{
                     left: 12,
                     right: 12
                  }}
               >
                  <CartesianGrid vertical={false} />
                  <XAxis
                     dataKey="month"
                     tickLine={false}
                     axisLine={false}
                     tickMargin={8}
                     tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                  <Area
                     dataKey="sales"
                     type="natural"
                     fill="var(--color-sales)"
                     fillOpacity={0.4}
                     stroke="var(--color-sales)"
                  />
               </AreaChart>
            </ChartContainer>
         </CardContent>
      </Card>
   );
}
