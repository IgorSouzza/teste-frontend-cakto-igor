"use client";

import { BadgeCheck, CreditCard } from "lucide-react";

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

export function PaymentInfo({
  deliveryTime,
  currentPrice,
}: {
  deliveryTime: string;
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
    }
  }

  function handleSelectInstallments(installments: string) {
    setInstallments(Number(installments));
  }

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
        <div className="flex gap-2 flex-col border-primary border mt-2 p-4 rounded">
          {extraInfo[paymentMethod]().map((item) => (
            <div key={item} className="flex items-start gap-2">
              <BadgeCheck className="size-4 mt-1 sm:mt-0 fill-primary" />
              <span className="text-sm">{item}</span>
            </div>
          ))}
        </div>
      )}

      {paymentMethod === "credit_card" && (
        <div className="mt-4">
          <Select onValueChange={handleSelectInstallments}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione as parcelas" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Parcelas</SelectLabel>
                {calculatedInstallments.map((installment) => (
                  <SelectItem
                    key={installment.number}
                    value={String(installment.number)}
                  >
                    {installment.number}x de{" "}
                    {formatCurrencyBRL(installment.installmentValue)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
