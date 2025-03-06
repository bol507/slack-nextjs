"use client";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { WorkspaceIdSidebar } from "./sidebar";
import { WorkspaceIdToolbar } from "./toolbar";
import { WorkspaceSidebar } from "./workspace-sidebar";
import { usePanel } from "@/app/hooks/use-panel";
import { Loader } from "lucide-react";
import { Thread } from "@/features/messages/components/thread";
import { Id } from "../../../../convex/_generated/dataModel";
import { Profile } from "@/features/members/components/profile";

interface WorkspaceIdLayoutProps {
  children: React.ReactNode;
}

const WorkspaceIdLayout = ({ children }: WorkspaceIdLayoutProps) => {
  const { parentMessageId, onClose, profileMemberId} = usePanel();
  const showPanel = !!parentMessageId || !!profileMemberId

  return (
    <div>
      <WorkspaceIdToolbar />
      <div className="flex h-[calc(100vh-40px)] w-full">
        <WorkspaceIdSidebar />
        <ResizablePanelGroup
          direction="horizontal"
          autoSaveId={"ca-workspace-layout"}
        >
          <ResizablePanel
            defaultSize={20}
            minSize={11}
            className="bg-[#5E2C5F]"
          >
            <WorkspaceSidebar />
            </ResizablePanel>
            <ResizableHandle withHandle/>
            <ResizablePanel minSize={20}>
            {children}
          </ResizablePanel>
          {showPanel  && (
            <>
              <ResizableHandle withHandle/>
              <ResizablePanel minSize={20} defaultSize={29}>
                {parentMessageId ? (
                  <Thread messageId={parentMessageId as Id<"messages">} onClose={onClose} />
                ) :  profileMemberId ? (
                  <Profile 
                    memberId = {profileMemberId as Id<"members">}
                    onClose={onClose}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Loader className="size-5 animate-spin text-muted-foreground" />
                  </div>
                )}
                
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
       
      </div>
     
    </div>
  );
};

export default WorkspaceIdLayout;