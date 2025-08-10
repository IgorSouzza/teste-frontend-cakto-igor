import { calculateInstallments } from "@/features/checkout/helpers/calculate-installments";

describe("calculateInstallments", () => {
  it("deve calcular corretamente a parcela à vista e as parcelas com juros", () => {
    const value = 100;
    const maxInstallments = 3;
    const installments = calculateInstallments(value, maxInstallments);

    expect(installments).toHaveLength(3);

    // Regra: 3.99% de taxa
    const installment1x = installments[0];
    expect(installment1x.number).toBe(1);
    expect(installment1x.totalValue).toBeCloseTo(103.99);
    expect(installment1x.installmentValue).toBeCloseTo(103.99);

    // Regra: 4.99% + 2% (por ser a 2ª parcela, i-1 = 1)
    const installment2x = installments[1];
    expect(installment2x.number).toBe(2);
    expect(installment2x.totalValue).toBeCloseTo(100 * 1.0499 + 100 * 0.02); // 106.99
    expect(installment2x.installmentValue).toBeCloseTo(106.99 / 2); // 53.495

    // Regra: 4.99% + 4% (por ser a 3ª parcela, i-1 = 2)
    const installment3x = installments[2];
    expect(installment3x.number).toBe(3);
    expect(installment3x.totalValue).toBeCloseTo(100 * 1.0499 + 100 * 0.04); // 108.99
    expect(installment3x.installmentValue).toBeCloseTo(108.99 / 3); // 36.33
  });

  it("deve retornar apenas a opção de 1x se maxInstallments for 1", () => {
    const value = 500;
    const maxInstallments = 1;
    const installments = calculateInstallments(value, maxInstallments);

    expect(installments).toHaveLength(1);

    const installment1x = installments[0];
    expect(installment1x.number).toBe(1);
    expect(installment1x.totalValue).toBeCloseTo(500 * 1.0399); // 519.95
    expect(installment1x.installmentValue).toBeCloseTo(519.95);
  });

  it("deve retornar um array vazio se maxInstallments for 0", () => {
    const value = 1000;
    const maxInstallments = 0;
    const installments = calculateInstallments(value, maxInstallments);

    expect(installments).toHaveLength(0);
    expect(installments).toEqual([]);
  });
});
