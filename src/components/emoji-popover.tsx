import { ReactNode, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

interface EmojiPopoverProps {
  children: ReactNode;
  hint?: string;
  onEmojiSelect: (emoji: any) => void;
}

export const EmojiPopover = ({
  children,
  hint = "Emoji",
  onEmojiSelect,
}: EmojiPopoverProps) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  return (
    <TooltipProvider>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <Tooltip
          open={tooltipOpen}
          onOpenChange={setTooltipOpen}
          delayDuration={50}
        >
          <PopoverTrigger asChild>
            <TooltipTrigger asChild>
              {children}
            </TooltipTrigger>
          </PopoverTrigger>
          <TooltipContent className="bg-black text-white border border-white/5">
            <p className="font-medium text-xs">{hint}</p>
          </TooltipContent>
          
        </Tooltip>
        <PopoverContent className="p-0 w-full border-none shadow-none">
          <Picker data={data} onEmojiSelect={(x) => console.log(x)} theme="dark" />
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  );
};