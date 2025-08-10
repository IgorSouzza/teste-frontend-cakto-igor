import { CheckoutSchema } from "../schemas/checkout-schema";
import { PaymentMethod } from "../stores/form-store";

interface CreateCheckoutParams extends CheckoutSchema {
  installments: number;
  paymentMethod: PaymentMethod;
}

// mocked POST action
export async function createCheckout(data: CreateCheckoutParams) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log("post finalized with payload:", data);
}
