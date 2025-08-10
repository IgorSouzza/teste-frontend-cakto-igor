import { getProduct } from "./actions/get-product";
import { ProductForm } from "./components/product-form";
import { ProductInfo } from "./components/product-info";

export const MAX_INSTALLMENTS = 12;

export async function CheckoutPage({ productId }: { productId: string }) {
  const product = await getProduct(productId);

  return (
    <div>
      <ProductInfo product={product} />
      <ProductForm product={product} />
    </div>
  );
}
