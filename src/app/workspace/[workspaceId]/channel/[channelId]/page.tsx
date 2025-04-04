"use client";

import { useChannelId } from "@/app/hooks/use-channel-id";
import { useGetChannel } from "@/features/channels/api/use-get-channel";
import { Loader, TriangleAlert } from "lucide-react";
import { ChannelHeader } from "./channel-header";
import { ChatInput } from "./chat-input";
import {  useGetMessages } from "@/features/messages/api/use-get-messages";
import { MessageList } from "@/components/message-list";

const ChannelIdPage = () => {
  const channelId = useChannelId();
  const { results, status, loadMore } = useGetMessages({channelId});
  const { data: channel, isLoading: channelLoading } = useGetChannel({
    id: channelId,
  });

  if (channelLoading || status === "LoadingFirstPage") {
    return (
      <div className="h-full flex-1 flex flex-col items-center justify-center">
        <Loader className="animate-spin size-5 text-muted-foreground  " />
      </div>
    );
  }

  if (!channel) {
    return (
      <div className="h-full flex-1 flex flex-col items-center justify-center gap-y-4">
        <TriangleAlert className="size-5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          Channel not found
        </span>
      </div>
    );
  }
  return (
    <div className="h-full flex flex-col">
      <ChannelHeader title={channel.name} />
      <MessageList 
        channelName = {channel.name}
        channelCreationTime = {channel._creationTime}
        data = {results}
        loadMore= {loadMore}
        isLoadingMore = {status==="LoadingMore"}
        canLoadMore = {status === "CanLoadMore"}
      />
      <ChatInput placeholder={`Message #${channel.name}`} />

    </div>
  );
};

export default ChannelIdPage;
