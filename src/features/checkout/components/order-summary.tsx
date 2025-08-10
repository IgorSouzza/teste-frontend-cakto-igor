"use client";

import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

import { OrderSummaryRow } from "./order-summary-row";
import { formatCurrencyBRL } from "@/shared/utils/formatters";
import { useEffect, useState } from "react";
import { useCheckoutFormStore } from "../stores/form-store";
import { calculateInstallments } from "../helpers/calculate-installments";
import { cn } from "@/shared/lib/utils";

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
      if (totalInstallments === 0) return;
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

      <div
        className={cn(
          "relative border rounded-lg p-4 space-y-3 border-primary mt-4 w-full",
          platformTax > 0 && " pb-8"
        )}
      >
        <OrderSummaryRow
          label={{ value: "Produto" }}
          value={{ value: formatCurrencyBRL(productBaseValue) }}
        />
        <OrderSummaryRow
          label={{ value: "Taxa Cakto" }}
          value={{
            value: formatCurrencyBRL(Math.abs(platformTax)),
            className: platformTax === 0 ? "text-green-400" : "",
          }}
        />

        <div className="w-full h-[1px] bg-foreground/40" />

        <OrderSummaryRow
          label={{ value: "Total", className: "text-white text-lg font-semibold" }}
          value={{
            value: formatCurrencyBRL(totalPrice),
            className: "font-semibold text-lg",
          }}
        />
        <OrderSummaryRow
          label={{ value: `${producerName} recebe`, className: "text-sm" }}
          value={{
            value: formatCurrencyBRL(producerTotal),
            className: "text-muted-foreground text-sm",
          }}
        />

        {platformTax > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
            }}
            className="w-full bg-primary/20 border-t border-primary rounded-b-lg text-sm py-1 flex items-center justify-center absolute left-0 bottom-0 text-[#83eab3]"
          >
            <span>
              Dica: economize{" "}
              <span className="font-bold">
                {formatCurrencyBRL(platformTax)}
              </span>{" "}
              ao pagar com PIX!
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
