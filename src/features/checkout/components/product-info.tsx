import Image from "next/image";

import {
  TypographyH3,
  TypographyParagraph,
} from "@/shared/components/ui/headers";
import { formatCurrencyBRL } from "@/shared/utils/formatters";
import { calculateInstallments } from "../helpers/calculate-installments";
import { MAX_INSTALLMENTS } from "../page";

type ProductInfoProps = {
  name: string;
  originalPrice: number;
  currentPrice: number;
};

export function ProductInfo({
  currentPrice,
  originalPrice,
  name,
}: ProductInfoProps) {
  const installments = calculateInstallments(currentPrice, MAX_INSTALLMENTS);
  const lastInstallment = installments[installments.length - 1];

  return (
    <div className="flex flex-col sm:flex-row mt-4 gap-4">
      <Image
        src="https://framerusercontent.com/images/dwsUDbqeEUic6MtNScUrnTEIJY.webp"
        alt=""
        width={400}
        height={400}
        className="bg-primary rounded-lg h-fit w-full sm:w-48 object-fit"
      />
      <div className="flex flex-col">
        <TypographyH3>{name}</TypographyH3>
        <div className="flex flex-col mt-2">
          <TypographyParagraph className="text-muted-foreground text-sm line-through font-bold">
            {formatCurrencyBRL(originalPrice)}
          </TypographyParagraph>
          <TypographyParagraph className="text-primary font-bold -mt-0.5 text-2xl">
            {formatCurrencyBRL(currentPrice)}
          </TypographyParagraph>
          <span className="text-sm text-muted-foreground">À vista no PIX</span>
          <span className="text-sm text-muted-foreground">
            ou em até {lastInstallment.number}x de{" "}
            {formatCurrencyBRL(lastInstallment.installmentValue)} no cartão
          </span>
        </div>
      </div>
    </div>
  );
}
