"use client";

import { CircleUser, LoaderCircle } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { checkoutSchema, CheckoutSchema } from "../schemas/checkout-schema";
import { Product } from "@/shared/entities/product";
import { PaymentInfo } from "./payment-info";
import { OrderSummary } from "./order-summary";
import { Button } from "@/shared/components/ui/button";
import { formatTaxId } from "@/shared/utils/formatters";
import { createCheckout } from "../actions/checkout";
import { useCheckoutFormStore } from "../stores/form-store";
import { MAX_INSTALLMENTS } from "../page";

type ProductFormProps = {
  product: Product;
};

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();

  const installments = useCheckoutFormStore((store) => store.installments);
  const paymentMethod = useCheckoutFormStore((store) => store.paymentMethod);

  const form = useForm<CheckoutSchema>({
    resolver: zodResolver(checkoutSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      taxId: "",
    },
  });
  const { formState, handleSubmit, register, control } = form;

  async function onSubmit(data: CheckoutSchema) {
    try {
      if (!paymentMethod) {
        throw new Error("Método de pagamento não encontrado");
      }
      if (!installments && paymentMethod === "credit_card") {
        throw new Error("Parcelas não encontrada");
      }

      if (
        paymentMethod === "credit_card" &&
        (installments < 1 || installments > MAX_INSTALLMENTS)
      ) {
        throw new Error("Ocorreu um erro ao finalizar sua compra");
      }

      await createCheckout({
        ...data,
        installments,
        paymentMethod,
      });

      router.push("/checkout/success");
    } catch (err) {
      console.log(err);
    }
  }

  const isFormValid = formState.isValid && !formState.isSubmitting;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-8">
        <div className="flex items-center gap-2">
          <CircleUser />
          <h4 className="text-lg font-semibold">Seus dados</h4>
        </div>
        <div className="mt-4 space-y-4">
          <Label htmlFor="email" className="mb-2">
            E-mail
          </Label>
          <Input
            type="email"
            id="email"
            placeholder="Preencha seu E-mail"
            {...register("email")}
          />
          {formState.errors.email && (
            <p className="text-destructive text-sm">
              {formState.errors.email.message}
            </p>
          )}
          <Label htmlFor="taxId" className="mb-2">
            CPF
          </Label>
          <Controller
            name="taxId"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="taxId"
                placeholder="Preencha seu CPF"
                onChange={(e) => {
                  const formatted = formatTaxId(e.target.value);
                  field.onChange(formatted);
                }}
              />
            )}
          />
          {formState.errors.taxId && (
            <p className="text-destructive text-sm">
              {formState.errors.taxId.message}
            </p>
          )}
        </div>
      </div>
      <PaymentInfo
        currentPrice={product.currentPrice}
        deliveryTime={product.deliveryTime}
      />
      <OrderSummary
        productBaseValue={product.currentPrice}
        producerName={product.producer}
      />
      <Button
        className="w-full mt-4 mb-8"
        size="lg"
        type="submit"
        disabled={!isFormValid}
      >
        {!formState.isSubmitting ? (
          "FINALIZAR COMPRA 🚀"
        ) : (
          <div className="flex gap-1 items-center">
            <LoaderCircle className="animate-spin" />
            Por favor, aguarde...
          </div>
        )}
      </Button>
    </form>
  );
}
