import { useWorkspaceId } from "@/app/hooks/use-workspace-id";
import { Button } from "@/components/ui/button";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { useGetChannels } from "@/features/channels/api/use-get-channels";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { InfoIcon, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const WorkspaceIdToolbar = () => {
  const workspaceId= useWorkspaceId();
  const {data} = useGetWorkspace({ id: workspaceId });
  const [open, setOpen] = useState(false);	
  const {data: channels} = useGetChannels({ workspaceId });
  const { data: members } = useGetMembers({ workspaceId });
  const router = useRouter();

  const onChannelClick = (channelId: string) => {
    setOpen(false);
    router.push(`/workspace/${workspaceId}/channel/${channelId}`);
  };

  const onMemberClick = (memberId: string) => {
    setOpen(false);
    router.push(`/workspace/${workspaceId}/member/${memberId}`);
  };

  return (
    <nav className="flex items-center justify-between h-10 p-1.5 bg-[#481349]">
      <div className="flex-1" />
      <div className="min-w-[280px] max-[642px] grow-[2] shrink">
        <Button onClick={()=> setOpen(true)} size="sm" className="bg-accent/25 hover:bg-accent-25 w-full  justify-start h-7 px-2" >
          <SearchIcon className="size-4 text-white mr-2" />
          <span className="text-white text-xs">
            {data?.name}
          </span>
        </Button>

        <CommandDialog open={open} onOpenChange={setOpen}  >
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Channels">
              {
                channels?.map((channel) => (
                  <CommandItem key={channel._id} onSelect={() => onChannelClick(channel._id)}>
                    {channel.name}
                  </CommandItem>
                ))
              }
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Members">
              {
                members?.map((member) => (
                  <CommandItem key={member._id}  onSelect={() => onMemberClick(member._id)}>
                    
                      {member.user.name}
                      
                  </CommandItem>
                ))
              }
            </CommandGroup>
          </CommandList>
        </CommandDialog>

      </div>
      <div className="ml-auto flex-1 flex items-center justify-end">
        <Button variant="transparent" >
          <InfoIcon className="size-5 text-white" />
        </Button>
      </div> 
    </nav>
  );
};
