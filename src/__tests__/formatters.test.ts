import { formatCurrencyBRL, formatTaxId } from "@/shared/utils/formatters";

describe("formatCurrencyBRL", () => {
  it("deve formatar um número positivo corretamente", () => {
    const result = formatCurrencyBRL(1234.56);
    expect(result).toMatch(/R\$\s*1\.234,56/);
  });

  it("deve formatar o zero corretamente", () => {
    const result = formatCurrencyBRL(0);
    expect(result).toMatch(/R\$\s*0,00/);
  });

  it("deve formatar um número negativo corretamente", () => {
    const result = formatCurrencyBRL(-500);
    expect(result).toMatch(/-R\$\s*500,00|R\$\s*-500,00/);
  });
});

describe("formatTaxId", () => {
  it("deve formatar um CPF completo com 11 dígitos", () => {
    const input = "12345678901";
    const expectedOutput = "123.456.789-01";
    expect(formatTaxId(input)).toBe(expectedOutput);
  });

  it("deve remover caracteres não numéricos antes de formatar", () => {
    const input = "123.abc.456/789-01";
    const expectedOutput = "123.456.789-01";
    expect(formatTaxId(input)).toBe(expectedOutput);
  });

  it("não deve formatar strings com 3 ou menos dígitos", () => {
    expect(formatTaxId("123")).toBe("123");
  });

  it("deve adicionar o primeiro ponto após o terceiro dígito", () => {
    expect(formatTaxId("12345")).toBe("123.45");
  });

  it("deve adicionar o segundo ponto após o sexto dígito", () => {
    expect(formatTaxId("12345678")).toBe("123.456.78");
  });

  it("deve adicionar o hífen corretamente", () => {
    expect(formatTaxId("12345678900")).toBe("123.456.789-00");
  });

  it("deve limitar a entrada a 11 dígitos antes de formatar", () => {
    const input = "1234567890123456";
    const expectedOutput = "123.456.789-01";
    expect(formatTaxId(input)).toBe(expectedOutput);
  });

  it("deve retornar uma string vazia se a entrada for vazia", () => {
    expect(formatTaxId("")).toBe("");
  });

  it("deve reformatar corretamente um CPF que já estava formatado", () => {
    const input = "987.654.321-00";
    const expectedOutput = "987.654.321-00";
    expect(formatTaxId(input)).toBe(expectedOutput);
  });
});
