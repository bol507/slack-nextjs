"use client";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { WorkspaceIdSidebar } from "./sidebar";
import { WorkspaceIdToolbar } from "./toolbar";
import { WorkspaceSidebar } from "./workspace-sidebar";

interface WorkspaceIdLayoutProps {
  children: React.ReactNode;
}

const WorkspaceIdLayout = ({ children }: WorkspaceIdLayoutProps) => {
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
        </ResizablePanelGroup>
       
      </div>
     
    </div>
  );
};

export default WorkspaceIdLayout;