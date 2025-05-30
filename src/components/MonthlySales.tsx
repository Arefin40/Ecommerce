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

const chartData = [
   { month: "December", sales: 186 },
   { month: "January", sales: 305 },
   { month: "February", sales: 237 },
   { month: "March", sales: 73 },
   { month: "April", sales: 209 },
   { month: "May", sales: 214 }
];

const chartConfig = {
   sales: {
      label: "Sales",
      color: "var(--chart-1)"
   }
} satisfies ChartConfig;

export function MonthlySales() {
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
                  data={chartData}
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
