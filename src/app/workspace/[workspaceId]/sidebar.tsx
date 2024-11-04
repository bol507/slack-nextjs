import UserButton from "@/features/auth/components/user-button";
import { WorkspaceIdSwitcher } from "./switcher";
import { SidebarButton } from "./sidebar-button";
import { Bell, HomeIcon, MessagesSquare, MoreHorizontal } from "lucide-react";
import { usePathname } from "next/navigation";

export const WorkspaceIdSidebar = () => {
  const pathName = usePathname(); 
  return (
    <aside className="w-[70px] h-full bg-[#481349] flex flex-col gap-y-4 items-center pt-[9px] pb-4">
      <WorkspaceIdSwitcher />
      <SidebarButton icon={HomeIcon} label="Home" isActive={pathName.includes("/workspaces")} />
      <SidebarButton icon={MessagesSquare} label="DMs"  />
      <SidebarButton icon={Bell} label="Activity" />
      <SidebarButton icon={MoreHorizontal} label="More" />
      <div className="flex flex-col items-center justify-center gap-y-1 mt-auto">
        <UserButton />
      </div>
    </aside>
  );
};
