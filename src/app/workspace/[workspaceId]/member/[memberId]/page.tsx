"use client";

import { useMemberId } from "@/app/hooks/use-member-id";
import { useWorkspaceId } from "@/app/hooks/use-workspace-id";
import { useCreateOrGetConversation } from "@/features/conversations/api/use-create-or-get-conversation";
import { AlertTriangleIcon, LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Conversation } from "./conversation";


const MemberIdPage = () => {
  const memberId = useMemberId();
  const workspaceId = useWorkspaceId();
  const {data,mutate,isPending} = useCreateOrGetConversation();
  const [conversationId, setConversationId] = useState<Id<"conversations">|null>(null);

  useEffect(() => {
    if (memberId && workspaceId) {
      mutate({
        memberId,
        workspaceId,
      },{
        onSuccess: (data) => {
          setConversationId(data);
        },
        onError: ( ) => {
          toast.error("Failed to create or get conversation");
        },
      });
    }
  }, [memberId, workspaceId, mutate]);

  if (isPending) {
    return (
      <div className="h-full flex items-center justify-center">
        <LoaderIcon className="animate-spin size-6 text-muted-foreground" />
      </div>
    );
  }

  if (!conversationId) {
    return (
      <div className="h-full flex items-center justify-center flex-col gap-y-2">
        <AlertTriangleIcon className="size-6 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          Conversation not found
        </span>
      </div>
    );
  }

  return (
    <Conversation id={conversationId} />
   
  );
};

export default MemberIdPage;