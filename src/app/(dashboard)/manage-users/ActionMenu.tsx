"use client";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
   DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { changeRole } from "@/actions/users";

interface ActionMenuProps {
   id: string;
   disabled?: boolean;
   hideAdmin?: boolean;
   hideUser?: boolean;
}

const ActionMenu: React.FC<ActionMenuProps> = ({
   id,
   disabled = false,
   hideAdmin = false,
   hideUser = false
}) => {
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild data-testid="manage-user-action-button">
            <Button variant="ghost" size="icon" className="rounded-full" disabled={disabled}>
               <MoreVertical size={20} />
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent side="right">
            <DropdownMenuLabel className="text-muted-foreground font-medium">
               Change Role
            </DropdownMenuLabel>
            {!hideUser && (
               <DropdownMenuItem
                  data-testid="user-role-button"
                  onClick={() => changeRole(id, "user")}
               >
                  User
               </DropdownMenuItem>
            )}
            {!hideAdmin && (
               <DropdownMenuItem
                  data-testid="admin-role-button"
                  onClick={() => changeRole(id, "admin")}
               >
                  Admin
               </DropdownMenuItem>
            )}
         </DropdownMenuContent>
      </DropdownMenu>
   );
};

export default ActionMenu;
