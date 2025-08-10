import { cn } from "@/shared/lib/utils";
import { Flame } from "lucide-react";

type PaymentInfoBoxProps = {
  selected: boolean;
  children: React.ReactNode;
  onClick: () => void;
  flag?: string;
};

export function PaymentInfoBox({
  selected,
  onClick,
  children,
  flag,
}: PaymentInfoBoxProps) {
  return (
    <div
      className={cn(
        "p-8 rounded-lg relative flex items-center justify-center flex-col gap-2 cursor-pointer hover:bg-primary/20 transition-all",
        selected ? "bg-primary" : "border-2 border-primary"
      )}
      onClick={onClick}
    >
      {flag && (
        <div className="absolute right-0 top-0 text-xs flex gap-0.5 items-center justify-center bg-violet-500 rounded-tr rounded-bl py-0.5 px-2  sm:py-2 sm:px-6">
          <span className="font-bold">{flag}</span>
          <Flame className="text-orange-400 fill-orange-400 size-4" />
        </div>
      )}
      {children}
    </div>
  );
}
