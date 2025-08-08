"use client";

import { useState } from "react";
import { BadgeCheck, CreditCard } from "lucide-react";

import { PaymentInfoBox } from "./payment-info-box";

type Methods = "pix" | "credit_card";

export function PaymentInfo() {
  const [selectedMethod, setSelectedMethod] = useState<Methods>("pix");

  const extraInfo: Record<Methods, string[]> = {
    pix: [
      "Liberação Imediata",
      "Pague em segundos com o aplicativo de seu banco",
    ],
    credit_card: [],
  };

  function handleChangeMethod(method: Methods) {
    if (selectedMethod === method) return;
    setSelectedMethod(method);
  }

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2">
        <CreditCard />
        <h4 className="text-lg font-semibold">Pagamento</h4>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        <PaymentInfoBox
          selected={selectedMethod === "pix"}
          onClick={() => handleChangeMethod("pix")}
          flag="Taxa 0%"
        >
          <CreditCard />
          <h3 className="text-primary-foreground font-semibold text-xs sm:text-lg">
            PIX
          </h3>
        </PaymentInfoBox>
        <PaymentInfoBox
          selected={selectedMethod === "credit_card"}
          onClick={() => handleChangeMethod("credit_card")}
        >
          <CreditCard />
          <h3 className="text-primary-foreground font-semibold text-xs sm:text-lg">
            Cartão de Crédito
          </h3>
        </PaymentInfoBox>
      </div>
      {extraInfo[selectedMethod].length > 0 && (
        <div className="flex gap-2 flex-col border-primary border mt-2 p-4 rounded">
          {extraInfo[selectedMethod].map((item) => (
            <div key={item} className="flex items-start gap-2">
              <BadgeCheck className="size-4 mt-1 sm:mt-0 fill-primary" />
              <span className="text-sm">{item}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
