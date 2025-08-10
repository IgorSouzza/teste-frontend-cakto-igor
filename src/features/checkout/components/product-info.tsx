import Image from "next/image";

import {
  TypographyH3,
  TypographyParagraph,
} from "@/shared/components/ui/headers";
import { formatCurrencyBRL } from "@/shared/utils/formatters";
import { calculateInstallments } from "../helpers/calculate-installments";
import { MAX_INSTALLMENTS } from "../page";
import { PixIcon } from "@/shared/components/icons";
import { Product } from "@/shared/entities/product";
import { Badge } from "@/shared/components/ui/badge";
import { Clock, GlobeIcon, UserIcon } from "lucide-react";

type ProductInfoProps = {
  product: Product;
};

export function ProductInfo({ product }: ProductInfoProps) {
  const installments = calculateInstallments(
    product.currentPrice,
    MAX_INSTALLMENTS
  );
  const lastInstallment = installments[installments.length - 1];

  return (
    <div className="flex flex-col sm:flex-row mt-4 gap-4">
      <Image
        src="https://framerusercontent.com/images/dwsUDbqeEUic6MtNScUrnTEIJY.webp"
        alt=""
        width={400}
        height={400}
        className="bg-primary rounded-lg h-fit w-full sm:w-60 object-fit"
      />
      <div className="flex flex-col">
        <div className="flex gap-2 mb-1">
          <Badge variant="default" className="capitalize">
            <UserIcon />
            {product.producer}
          </Badge>
          <Badge variant="secondary" className="capitalize">
            <GlobeIcon />
            {product.format}
          </Badge>
          <Badge variant="secondary" className="capitalize">
            <Clock />
            Acesso {product.deliveryTime}
          </Badge>
        </div>
        <TypographyH3>{product.name}</TypographyH3>
        <div className="flex flex-col mt-2">
          <TypographyParagraph className="text-muted-foreground text-sm line-through font-bold">
            {formatCurrencyBRL(product.originalPrice)}
          </TypographyParagraph>
          <TypographyParagraph className="text-primary font-bold -mt-0.5 text-2xl">
            {formatCurrencyBRL(product.currentPrice)}
          </TypographyParagraph>
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <PixIcon size={12} />À vista no PIX
          </span>
          <span className="text-sm text-muted-foreground">
            ou em até {lastInstallment.number}x de{" "}
            {formatCurrencyBRL(lastInstallment.installmentValue)} no cartão
          </span>
        </div>
      </div>
    </div>
  );
}
