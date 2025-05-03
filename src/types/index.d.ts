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

   type User = {
      id: string;
      name: string;
      email: string;
      emailVerified: boolean;
      createdAt: Date;
      updatedAt: Date;
      image?: string | null | undefined | undefined;
      role: string;
   };
}
