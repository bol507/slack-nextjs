import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateChannelModal } from "../store/use-create-channel-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCreateChannel } from "../api/use-create-channel";
import { useWorkspaceId } from "@/app/hooks/use-workspace-id";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const CreateChannelModal = () => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const { mutate, isPending} = useCreateChannel();
  const [open, setOpen] = useCreateChannelModal();
  const [name, setName] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, "-").toLocaleLowerCase();
    setName(value);
  };
 
  const handleClose = () => {
    setName("");
    setOpen(false);
  };

  const handleSubmit =  (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ name, workspaceId },{
      onSuccess: (id) => {
        toast.success("Channel created");
        router.push(`/workspace/${workspaceId}/channel/${id}`);
        handleClose();
      },
      onError: () => {
        toast.error("Failed to create channel");
      }
    });

  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="mb-4">
          <DialogTitle>Add a channel</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Input 
            value={name}
            disabled={isPending}
            onChange={handleChange}
            required
            autoFocus
            minLength={3}
            maxLength={80}
            placeholder="e.g. #general"
            />
            <div className="flex justify-end">
              <Button disabled={isPending}>Create</Button>
            </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
