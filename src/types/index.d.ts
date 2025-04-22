export type Address = {
   id: string;
   label: string | null;
   address: string;
   contact: string;
   zone: string | null;
   zoneId: number | null;
   area: string | null;
   areaId: number | null;
};

declare global {
   type Option = Record<"value" | "label", string> & Record<string, string>;

   interface DashboardIconProps extends React.SVGProps<SVGSVGElement> {
      active?: boolean;
      filled?: boolean;
   }
}
