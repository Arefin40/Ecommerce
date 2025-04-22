import { Inventory, MerchantRequests, Orders, Posts, User } from "@/icons";

interface MenuItem {
   name: string;
   href: string;
   icon: React.FC<DashboardIconProps>;
}

type DashboardMenuItems = {
   admin: MenuItem[];
   merchant: MenuItem[];
};

export const DashboardMenuItems: DashboardMenuItems = {
   admin: [
      {
         name: "Manage Users",
         href: "/manage-users",
         icon: User
      },
      {
         name: "Merchant Requests",
         href: "/merchant-requests",
         icon: MerchantRequests
      },
      {
         name: "Manage Orders",
         href: "/manage-orders",
         icon: Inventory
      }
   ],
   merchant: [
      {
         name: "Manage Posts",
         href: "/manage-posts",
         icon: Posts
      },
      {
         name: "Manage Inventory",
         href: "/manage-inventory",
         icon: Inventory
      },
      {
         name: "Received Orders",
         href: "/received-orders",
         icon: Orders
      }
   ]
};

export const DashboardPageTitles = {
   "": "Dashboard",
   "manage-users": "Manage Users",
   "merchant-requests": "Merchant Requests",
   "manage-orders": "Manage Orders",
   "manage-posts": "Manage Posts",
   "manage-inventory": "Manage Inventory",
   "received-orders": "Received Orders"
};
