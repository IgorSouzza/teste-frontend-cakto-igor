import { create } from "zustand";

export type PaymentMethod = "pix" | "credit_card";

interface CheckoutFormState {
  paymentMethod?: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
}

export const useCheckoutFormStore = create<CheckoutFormState>((set) => ({
  setPaymentMethod: (paymentMethod) => {
    set(() => ({ paymentMethod }));
  },
}));
