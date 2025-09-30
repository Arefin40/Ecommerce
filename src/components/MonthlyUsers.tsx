"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
   ChartConfig,
   ChartContainer,
   ChartTooltip,
   ChartTooltipContent
} from "@/components/ui/chart";

export const description = "A bar chart with a custom label";

const chartData = [
   { month: "December", customer: 186, mobile: 80 },
   { month: "January", customer: 305, mobile: 200 },
   { month: "February", customer: 237, mobile: 120 },
   { month: "March", customer: 73, mobile: 190 },
   { month: "April", customer: 209, mobile: 130 },
   { month: "May", customer: 214, mobile: 140 }
];

const chartConfig = {
   customer: {
      label: "Desktop",
      color: "var(--chart-2)"
   },
   mobile: {
      label: "Mobile",
      color: "var(--chart-2)"
   },
   label: {
      color: "var(--background)"
   }
} satisfies ChartConfig;

export function MonthlyUsers({ role = "merchant" }) {
   return (
      <Card>
         <CardHeader>
            <CardTitle>Monthly {role === "merchant" ? "Orders" : "Customer"}</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
         </CardHeader>
         <CardContent>
            <ChartContainer config={chartConfig}>
               <BarChart
                  accessibilityLayer
                  data={chartData}
                  layout="vertical"
                  margin={{
                     right: 16
                  }}
               >
                  <CartesianGrid horizontal={false} />
                  <YAxis
                     dataKey="month"
                     type="category"
                     tickLine={false}
                     tickMargin={10}
                     axisLine={false}
                     tickFormatter={(value) => value.slice(0, 3)}
                     hide
                  />
                  <XAxis dataKey="customer" type="number" hide />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                  <Bar dataKey="customer" layout="vertical" fill="var(--color-customer)" radius={4}>
                     <LabelList
                        dataKey="month"
                        position="insideLeft"
                        offset={8}
                        className="fill-(--color-label)"
                        fontSize={12}
                     />
                     <LabelList
                        dataKey="customer"
                        position="right"
                        offset={8}
                        className="fill-foreground"
                        fontSize={12}
                     />
                  </Bar>
               </BarChart>
            </ChartContainer>
         </CardContent>
      </Card>
   );
}
