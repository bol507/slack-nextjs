import { useConfirm } from "@/app/hooks/use-confirm";
import { useWorkspaceId } from "@/app/hooks/use-workspace-id";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNewJoinCode } from "@/features/workspaces/api/use-new-join-code";
import { CopyIcon, RefreshCcw } from "lucide-react";
import { toast } from "sonner";

interface InviteModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  name: string;
  joinCode: string;
}
export const InviteModal = ({
  open,
  setOpen,
  name,
  joinCode,
}: InviteModalProps) => {
  const workspaceId = useWorkspaceId();
  const {mutate, isPending} = useNewJoinCode();
  const [ConfirmDialog, confirm] = useConfirm({
    title:"Are you sure?",
    message: "This will deactivate the current invite code and generate a new one.",
  });
  const handleCopy = () => {
    const inviteLink = `${window.location.origin}/join/${workspaceId}`;
    navigator.clipboard
      .writeText(inviteLink)
      .then(() => toast.success("Invite link copied to clipboard"));
  };

  const handleNewCode = async () => {
    const ok = await confirm();
    if (!ok) return;
    await mutate({
      workspaceId,
    }, {
        onSuccess: () => {
          toast.success("New code generated");
        },
        onError: () => {
          toast.error("failed to regenerate invite code");
        },
         
    });
  };

  return (
    <>
      <ConfirmDialog />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite people to {name}</DialogTitle>
            <DialogDescription className="text-sm">
              Use the code below to invite people to your workspace.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-y-4 items-center justify-center py-10">
            <p className="text-4xl font-bold tracking-widest uppercase">
              {joinCode}
            </p>
            <Button onClick={handleCopy} variant="ghost" size="sm">
              Copy link
              <CopyIcon className="size-4 ml-2" />
            </Button>
          </div>
          <div className="flex items-center justify-between w-full">
            <Button disabled={isPending} onClick={handleNewCode} variant="outline">
              New code
              <RefreshCcw className="size-4 ml-2" />
            </Button>
            <DialogClose asChild>
              <Button>
                Close
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
