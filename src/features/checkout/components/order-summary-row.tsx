import { cn } from "@/shared/lib/utils";

type OrderSummaryRowProps = {
  label: {
    value: string;
    className?: string;
  };
  value: {
    value: string;
    className?: string;
  };
};

export function OrderSummaryRow({ label, value }: OrderSummaryRowProps) {
  return (
    <div className="flex justify-between items-center w-full">
      <span
        className={cn(
          "text-muted-foreground",
          label.className
        )}
      >
        {label.value}:
      </span>
      <span className={cn("font-sans font-medium", value.className)}>
        {value.value}
      </span>
    </div>
  );
}
