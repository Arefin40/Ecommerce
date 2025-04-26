"use client";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { changeStatus } from "@/actions/merchants";

interface ActionMenuProps {
   id: string;
   disabled?: boolean;
}

const ActionMenu: React.FC<ActionMenuProps> = ({ id, disabled = false }) => {
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full" disabled={disabled}>
               <MoreVertical size={20} />
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent side="right">
            <DropdownMenuItem onClick={() => changeStatus(id, "approved")}>
               Approve
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeStatus(id, "rejected")}>Reject</DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
};

export default ActionMenu;
