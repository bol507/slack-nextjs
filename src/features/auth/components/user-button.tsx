"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "../hooks/use-current-user";
import { Loader, LogOut } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";


const UserButton = () => {
    const { signOut } = useAuthActions();
    const { data, isLoading } = useCurrentUser();
    if (isLoading) {
        return <Loader className="size-4 animated-spin text-muted-foreground" />;
    }
    if (!data) {
        return null;
    }

    const { name, image } = data;
    const avatarFallback =  name ? name.charAt(0).toUpperCase() : '';
  return (
    <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="outline-none relative">
            <Avatar className="size-10 hover:opcity-75 transition">
                <AvatarImage alt={name} src={image} />
                <AvatarFallback className="bg-sky-500 text-white">
                    {avatarFallback}
                </AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-60" align="center" side="right">
            <DropdownMenuItem onClick={() => signOut()} className="h-10">
                <LogOut className="size-4 mr-2" />
                Logout
            </DropdownMenuItem>
            
        </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;