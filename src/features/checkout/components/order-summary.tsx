import { ShoppingCart } from "lucide-react";
import { OrderSummaryRow } from "./order-summary-row";

export function OrderSummary() {
  return (
    <div className="mt-8">
      <div className="flex items-center gap-2">
        <ShoppingCart />
        <h4 className="text-lg font-semibold">Resumo do Pedido</h4>
      </div>

      <div className="border rounded p-2 space-y-2 border-primary mt-4 w-full">
        <OrderSummaryRow label="Produto" value="R$ 0,00" />
        <OrderSummaryRow label="Taxa Cakto" value="R$ 0,00" />
        <OrderSummaryRow label="Total" value="R$ 0,00" />

        <div className="w-full h-[1px] bg-foreground/60" />

        <OrderSummaryRow label="João recebe" value="R$ 0,00" />
      </div>
    </div>
  );
}
