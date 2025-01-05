import { v } from "convex/values";
import { mutation, QueryCtx, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { Id } from "./_generated/dataModel";
import { count, timeStamp } from "console";
import { paginationOptsValidator } from "convex/server";

const populateThread = async (ctx: QueryCtx, messageId: Id<"messages">) => {
  const message = await ctx.db
    .query("messages")
    .withIndex("by_parent_message_id", (q) =>
      q.eq("parentMessageId", messageId)
    )
    .collect();
  if (message.length === 0) {
    return {
      count: 0,
      image: undefined,
      timestamp: 0,
    }
  }
  const lastMessage = message[message.length - 1];
  const lastMessageMember = await populateMember(ctx, lastMessage.memberId);

  if(!lastMessageMember) {
    return{
      count: 0,
      image: undefined,
      timestamp: 0,
    }
  }

  const lastMessageUser = await populateUser(ctx, lastMessageMember.userId);
  return {
    count: message.length,
    image: lastMessageUser?.image,
    timestamp: lastMessage._creationTime ,
  };
};

const populateReactions = (ctx: QueryCtx, messageId: Id<"messages">) => {
  return ctx.db
    .query("reactions")
    .withIndex("by_message_id", (q) =>
    q.eq("messageId", messageId))
    .collect();
};

const populateUser = (ctx: QueryCtx, userId: Id<"users">) => {
  return ctx.db.get(userId)
};

const populateMember = (ctx: QueryCtx, memberId: Id<"members">) => {
  return ctx.db.get(memberId)
};

const getMember = async (
  ctx: QueryCtx,
  workspaceId: Id<"workspaces">,
  userId: Id<"users">
) => {
  return ctx.db
    .query("members")
    .withIndex("by_workspace_id_user_id", (q) =>
      q.eq("workspaceId", workspaceId).eq("userId", userId)
    )
    .unique();
};

export const create = mutation({
  args: {
    body: v.string(),
    workspaceId: v.id("workspaces"),
    image: v.optional(v.id("_storage")),
    channelId: v.optional(v.id("channels")),
    conversationId: v.optional(v.id("conversations")),
    parentMessageId: v.optional(v.id("messages")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");
    const member = await getMember(ctx, args.workspaceId, userId);
    if (!member) throw new Error("Unauthorized");
    let _conversationId = args.conversationId;
    if (!args.conversationId && !args.channelId && args.parentMessageId) {
      const parentMessage = await ctx.db.get(args.parentMessageId)

      if (!parentMessage) throw new Error("Invalid parent message");
      _conversationId = parentMessage.conversationId;
    }
    
    const messageId = await ctx.db.insert("messages", {
      memberId: member._id,
      body: args.body,
      image: args.image,
      workspaceId: args.workspaceId,
      channelId: args.channelId,
      parentMessageId: args.parentMessageId,
      updatedAt: Date.now(),
      conversationId: _conversationId,
    });
    return messageId;
  },
});

export const get = query({
  args:{
    conversationId: v.optional(v.id("conversations")),
    channelId: v.optional(v.id("channels")),
    parentMessageId: v.optional(v.id("messages")),
    paginationOpts: paginationOptsValidator
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    let _conversationId = args.conversationId;
    if (!args.conversationId && !args.channelId && args.parentMessageId) {
      const parentMessage = await ctx.db.get(args.parentMessageId)

      if (!parentMessage) throw new Error("Invalid parent message");
      _conversationId = parentMessage.conversationId;
    }
    const result = await ctx.db
      .query("messages")
      .withIndex("by_channel_id_parent_message_id_conversation_id", (q) =>
        q
          .eq("channelId", args.channelId)
          .eq("parentMessageId", args.parentMessageId)
          .eq("conversationId", _conversationId)
      )
      .order("desc")
      .paginate(args.paginationOpts);
    return result;
  },
});