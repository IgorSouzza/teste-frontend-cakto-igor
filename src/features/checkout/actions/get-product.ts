"use server";

export async function getProduct(id: string) {
  console.debug(`Getting product with id ${id}...`)
  // Mocked return product
  return {
    id: 1,
    name: "Curso de Marketing Digital 2025",
    originalPrice: 497.0,
    currentPrice: 297.0,
    producer: "João Silva",
    format: "digital",
    deliveryTime: "imediato",
  };
}
