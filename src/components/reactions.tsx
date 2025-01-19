import { useWorkspaceId } from "@/app/hooks/use-workspace-id";
import { Doc, Id } from "../../convex/_generated/dataModel";
import { useCurrentMember } from "@/features/members/api/use-current-member";

interface ReactionsProps {
  data: Array<
    Omit<Doc<"reactions">, "memberId"> & {
      count: number;
      memberIds: Id<"members">[];
    }
    >;
    onChange: (value: string) => void;
}

export const Reactions = ({ data, onChange }: ReactionsProps) => {
  const workspaceId = useWorkspaceId();
  const {data:currentMember} = useCurrentMember({workspaceId});
  const currentMemberId = currentMember?._id;
  if (data.length === 0 || !currentMemberId) return null;

  return (
    <div className="flex items-center gap-1 mt-1 mb-1">  
      {data.map((reaction) => (
        <button>
          {reaction.value}
        </button>
      ))}
    </div>
  )
};