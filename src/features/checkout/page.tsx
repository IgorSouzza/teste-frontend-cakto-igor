import { getProduct } from "./actions/get-product";
import { PaymentInfo } from "./components/payment-info";
import { ProductForm } from "./components/product-form";
import { ProductInfo } from "./components/product-info";

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
      <PaymentInfo />
    </div>
  );
}
