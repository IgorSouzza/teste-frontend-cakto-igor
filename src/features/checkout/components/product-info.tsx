import Image from "next/image";

import {
  TypographyH3,
  TypographyParagraph,
} from "@/shared/components/ui/headers";
import { formatCurrencyBRL } from "@/shared/utils/formatters";

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
  return (
    <div className="flex flex-col sm:flex-row mt-4 gap-4">
      <Image
        src="https://framerusercontent.com/images/dwsUDbqeEUic6MtNScUrnTEIJY.webp"
        alt=""
        width={400}
        height={400}
        className="bg-primary rounded-lg h-fit w-full sm:w-fit object-fit"
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
          <span className="text-sm text-muted-foreground mt-2">
            À vista no PIX
          </span>
          <span className="text-sm text-muted-foreground">
            R$ 0,00 em até 4x de R$ 0,00 no cartão
          </span>
        </div>
      </div>
    </div>
  );
}
