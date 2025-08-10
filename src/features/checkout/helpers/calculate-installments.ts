import { Installment } from "@/shared/entities/installment";

const SINGLE_INSTALLMENT_FEE_RATE = 0.0399;
const MULTIPLE_INSTALLMENTS_BASE_FEE_RATE = 0.0499;
const ADDITIONAL_FEE_RATE_PER_INSTALLMENT = 0.02;

export function calculateInstallments(
  value: number,
  maxInstallments: number
): Installment[] {
  const installments: Installment[] = [];

  // The fee is 3.99% of the original value
  if (maxInstallments >= 1) {
    const totalValue1x = value * (1 + SINGLE_INSTALLMENT_FEE_RATE);
    installments.push({
      number: 1,
      installmentValue: totalValue1x,
      totalValue: totalValue1x,
    });
  }

  for (let i = 2; i <= maxInstallments; i++) {
    const totalFeePercentage =
      MULTIPLE_INSTALLMENTS_BASE_FEE_RATE +
      ADDITIONAL_FEE_RATE_PER_INSTALLMENT * (i - 1);
    const totalValue = value * (1 + totalFeePercentage);
    const installmentValue = totalValue / i;

    installments.push({
      number: i,
      installmentValue: installmentValue,
      totalValue: totalValue,
    });
  }

  return installments;
}
