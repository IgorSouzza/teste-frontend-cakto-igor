import { getProduct } from "./actions/get-product";
import { OrderSummary } from "./components/order-summary";
import { PaymentInfo } from "./components/payment-info";
import { ProductForm } from "./components/product-form";
import { ProductInfo } from "./components/product-info";
import { SubmitButton } from "./components/submit-button";

export const MAX_INSTALLMENTS = 12;

export async function CheckoutPage({ productId }: { productId: string }) {
  const product = await getProduct(productId);

  return (
    <div>
      <ProductInfo
        name={product.name}
        currentPrice={product.currentPrice}
        originalPrice={product.originalPrice}
      />
      <ProductForm />
      <PaymentInfo
        currentPrice={product.currentPrice}
        deliveryTime={product.deliveryTime}
      />
      <OrderSummary
        productBaseValue={product.currentPrice}
        producerName={product.producer}
      />
      <SubmitButton />
    </div>
  );
}
