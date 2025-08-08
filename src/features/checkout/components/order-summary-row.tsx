type OrderSummaryRowProps = {
  label: string;
  value: string;
};

export function OrderSummaryRow({ label, value }: OrderSummaryRowProps) {
  return (
    <div className="flex justify-between items-center w-full">
      <span className="font-semibold">{label}:</span>
      <span className="font-bold font-sans text-sm">{value}</span>
    </div>
  );
}
