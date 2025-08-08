"use client";

import { ShoppingCart } from "lucide-react";
import { OrderSummaryRow } from "./order-summary-row";
import { formatCurrencyBRL } from "@/shared/utils/formatters";
import { useEffect, useState } from "react";
import { useCheckoutFormStore } from "../stores/form-store";
import { calculateInstallments } from "../helpers/calculate-installments";

type OrderSummaryProps = {
  productBaseValue: number;
  producerName: string;
};

export function OrderSummary({
  productBaseValue,
  producerName,
}: OrderSummaryProps) {
  const [platformTax, setPlatformTax] = useState(0);
  const paymentMethod = useCheckoutFormStore((store) => store.paymentMethod);
  const totalInstallments = useCheckoutFormStore((store) => store.installments);

  useEffect(() => {
    if (paymentMethod === "credit_card") {
      if (totalInstallments === 0) return
      const installments = calculateInstallments(
        productBaseValue,
        totalInstallments
      );
      const lastInstallment = installments[installments.length - 1];
      setPlatformTax(Math.abs(productBaseValue - lastInstallment.totalValue));
    } else {
      setPlatformTax(0);
    }
  }, [paymentMethod, productBaseValue, totalInstallments]);

  const totalPrice = productBaseValue + platformTax;
  const producerTotal = productBaseValue - platformTax;

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2">
        <ShoppingCart />
        <h4 className="text-lg font-semibold">Resumo do Pedido</h4>
      </div>

      <div className="border rounded p-2 space-y-2 border-primary mt-4 w-full">
        <OrderSummaryRow
          label="Produto"
          value={formatCurrencyBRL(productBaseValue)}
        />
        <OrderSummaryRow
          label="Taxa Cakto"
          value={formatCurrencyBRL(Math.abs(platformTax))}
        />
        <OrderSummaryRow label="Total" value={formatCurrencyBRL(totalPrice)} />

        <div className="w-full h-[1px] bg-foreground/60" />

        <OrderSummaryRow
          label={`${producerName} recebe`}
          value={formatCurrencyBRL(producerTotal)}
        />
      </div>
    </div>
  );
}
