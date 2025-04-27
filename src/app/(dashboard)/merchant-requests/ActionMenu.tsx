"use client";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { approveApplication, rejectApplication } from "@/actions/merchants";

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
            <DropdownMenuItem onClick={() => approveApplication(id)}>Approve</DropdownMenuItem>
            <DropdownMenuItem onClick={() => rejectApplication(id)}>Reject</DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
};

export default ActionMenu;
