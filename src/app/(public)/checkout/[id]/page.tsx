import { CheckoutPage } from "@/features/checkout/page";

type CheckoutProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Checkout({ params }: CheckoutProps) {
  const { id } = await params;
  return <CheckoutPage productId={id} />;
}
