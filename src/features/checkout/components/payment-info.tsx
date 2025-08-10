"use client";

import { BadgeCheck, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";

import { PaymentInfoBox } from "./payment-info-box";
import { PaymentMethod, useCheckoutFormStore } from "../stores/form-store";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { MAX_INSTALLMENTS } from "../page";
import { calculateInstallments } from "../helpers/calculate-installments";
import { formatCurrencyBRL } from "@/shared/utils/formatters";
import { PixIcon } from "@/shared/components/icons";
import { ProductDeliveryTime } from "@/shared/entities/product";
import { Label } from "@/shared/components/ui/label";

export function PaymentInfo({
  deliveryTime,
  currentPrice,
}: {
  deliveryTime: ProductDeliveryTime;
  currentPrice: number;
}) {
  const calculatedInstallments = calculateInstallments(
    currentPrice,
    MAX_INSTALLMENTS
  );

  const paymentMethod = useCheckoutFormStore((store) => store.paymentMethod);
  const setPaymentMethod = useCheckoutFormStore(
    (store) => store.setPaymentMethod
  );
  const setInstallments = useCheckoutFormStore(
    (store) => store.setInstallments
  );

  const extraInfo: Record<PaymentMethod, () => string[]> = {
    pix: () => {
      const isInstant = deliveryTime === "imediato";
      const features = ["Pague em segundos com o aplicativo de seu banco"];
      if (isInstant) features.push("Liberação Imediata");
      return features;
    },
    credit_card: () => [],
  };

  function handleChangeMethod(method: PaymentMethod) {
    if (paymentMethod === method) return;
    setPaymentMethod(method);
    if (method === "pix") {
      setInstallments(0);
    } else {
      setInstallments(1);
    }
  }

  function handleSelectInstallments(installments: string) {
    setInstallments(Number(installments));
  }

  useEffect(() => {
    setInstallments(1);
  }, [setInstallments]);

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2">
        <CreditCard />
        <h4 className="text-lg font-semibold">Pagamento</h4>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        <PaymentInfoBox
          selected={paymentMethod === "pix"}
          onClick={() => handleChangeMethod("pix")}
          flag="Taxa 0%"
        >
          <PixIcon />
          <h3 className="text-primary-foreground font-semibold text-xs sm:text-lg">
            PIX
          </h3>
        </PaymentInfoBox>
        <PaymentInfoBox
          selected={paymentMethod === "credit_card"}
          onClick={() => handleChangeMethod("credit_card")}
        >
          <CreditCard />
          <h3 className="text-primary-foreground font-semibold text-xs sm:text-lg">
            Cartão de Crédito
          </h3>
        </PaymentInfoBox>
      </div>
      {!!paymentMethod && extraInfo[paymentMethod]().length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            ease: "easeInOut",
          }}
          className="flex gap-2 flex-col border-primary border mt-4 p-4 rounded-lg"
        >
          {extraInfo[paymentMethod]().map((item) => (
            <div key={item} className="flex items-start gap-2">
              <BadgeCheck className="size-4 mt-1 sm:mt-0 fill-primary" />
              <span className="text-sm">{item}</span>
            </div>
          ))}
        </motion.div>
      )}

      {paymentMethod === "credit_card" && (
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.4,
            ease: "easeInOut",
          }}
          className="mt-4"
        >
          <Label htmlFor="installments" className="mb-2">
            Parcelas
          </Label>
          <Select onValueChange={handleSelectInstallments} defaultValue="1">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione as parcelas" />
            </SelectTrigger>
            <SelectContent id="installments">
              <SelectGroup>
                <SelectLabel>Parcelas</SelectLabel>
                {calculatedInstallments.map((installment) => (
                  <SelectItem
                    key={installment.number}
                    value={String(installment.number)}
                  >
                    <span>
                      {installment.number}x de{" "}
                      {formatCurrencyBRL(installment.installmentValue)}
                    </span>
                    <span className="text-muted-foreground">
                      - Total: {formatCurrencyBRL(installment.totalValue)}
                    </span>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </motion.div>
      )}
    </div>
  );
}
