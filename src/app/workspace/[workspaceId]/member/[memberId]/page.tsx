"use client";

import { useMemberId } from "@/app/hooks/use-member-id";
import { useWorkspaceId } from "@/app/hooks/use-workspace-id";


const MemberIdPage = () => {
  const memberId = useMemberId();
  const workspaceId = useWorkspaceId();
  return <div>memberIdPage</div>;
};

export default MemberIdPage;