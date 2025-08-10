import { create } from "zustand";

export type PaymentMethod = "pix" | "credit_card";

interface CheckoutFormState {
  installments: number;
  setInstallments: (installments: number) => void;

  paymentMethod?: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
}

export const useCheckoutFormStore = create<CheckoutFormState>((set) => ({
  paymentMethod: 'pix',
  installments: 0,
  setInstallments: (installments) => {
    set(() => ({ installments }));
  },
  setPaymentMethod: (paymentMethod) => {
    set(() => ({ paymentMethod }));
  },
}));
