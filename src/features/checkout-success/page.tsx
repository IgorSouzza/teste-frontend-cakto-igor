import { Check } from "lucide-react";
import { ActionButtons } from "./components/action-buttons";

export function CheckoutSuccessPage() {
  return (
    <div className="w-full h-[calc(100vh-100px)] flex items-center justify-center">
      <div className="flex flex-col items-center justify-center text-center">
        <Check className="size-32 text-green-400" />
        <div className="flex flex-col">
          <h2 className="text-4xl">Tudo certo com sua compra!</h2>
          <span className="mt-2 text-muted-foreground">
            Fique de olho em seu E-mail, em instantes você receberá instruções
            para acessar o produto!
          </span>
          <ActionButtons />
        </div>
      </div>
    </div>
  );
}
