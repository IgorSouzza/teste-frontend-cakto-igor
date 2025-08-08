type Installment = {
  number: number;
  installmentValue: number;
  totalValue: number;
};

export function calculateInstallments(
  value: number,
  maxInstallments: number
): Installment[] {
  const installments: Installment[] = [];

  // The fee is 3.99% of the original value
  if (maxInstallments >= 1) {
    const totalValue1x = value * (1 + 0.0399);
    installments.push({
      number: 1,
      installmentValue: totalValue1x,
      totalValue: totalValue1x,
    });
  }

  for (let i = 2; i <= maxInstallments; i++) {
    const valueWithBaseFee = value * (1 + 0.0499);
    const additionalFee = value * (0.02 * (i - 1));
    const totalInstallmentValue = valueWithBaseFee + additionalFee;
    const eachInstallmentValue = totalInstallmentValue / i;

    installments.push({
      number: i,
      installmentValue: eachInstallmentValue,
      totalValue: totalInstallmentValue,
    });
  }

  return installments;
}
