import { z } from "zod";

const taxIdRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

export const checkoutSchema = z.object({
  email: z.email("E-mail inválido"),
  taxId: z.string().regex(taxIdRegex, {
    message: "CPF inválido.",
  }),
});

export type CheckoutSchema = z.infer<typeof checkoutSchema>;
