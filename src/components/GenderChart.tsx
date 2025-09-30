"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
   ChartConfig,
   ChartContainer,
   ChartLegend,
   ChartLegendContent,
   ChartTooltip,
   ChartTooltipContent
} from "@/components/ui/chart";

export const description = "A radar chart with a legend";

const adminChartData = [
   { month: "December", female: 186, male: 80 },
   { month: "January", female: 305, male: 200 },
   { month: "February", female: 237, male: 120 },
   { month: "March", female: 73, male: 190 },
   { month: "April", female: 209, male: 130 },
   { month: "May", female: 214, male: 140 }
];
const merchantChartData = [
   { month: "December", female: 0, male: 0 },
   { month: "January", female: 0, male: 0 },
   { month: "February", female: 0, male: 0 },
   { month: "March", female: 0, male: 0 },
   { month: "April", female: 0, male: 0 },
   { month: "May", female: 0, male: 0 }
];

const chartConfig = {
   male: {
      label: "Male",
      color: "var(--chart-2)"
   },
   female: {
      label: "Female",
      color: "var(--chart-1)"
   }
} satisfies ChartConfig;

export function GenderChart({ role = "admin" }: { role: "admin" | "merchant" }) {
   return (
      <Card>
         <CardHeader className="pb-4">
            <CardTitle>Audience By Gender</CardTitle>
            <CardDescription>Showing total visitors for the last 6 months</CardDescription>
         </CardHeader>
         <CardContent>
            <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
               <RadarChart
                  data={role === "merchant" ? merchantChartData : adminChartData}
                  margin={{
                     top: -40,
                     bottom: -10
                  }}
               >
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                  <PolarAngleAxis dataKey="month" />
                  <PolarGrid />
                  <Radar dataKey="female" fill="var(--color-female)" fillOpacity={0.6} />
                  <Radar dataKey="male" fill="var(--color-male)" />
                  <ChartLegend className="mt-8" content={<ChartLegendContent />} />
               </RadarChart>
            </ChartContainer>
         </CardContent>
      </Card>
   );
}
