"use client";

import confetti from "canvas-confetti";

import { Button } from "@/shared/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function ActionButtons() {
  const router = useRouter();

  function handleBack() {
    router.push("/checkout/1");
  }

  useEffect(() => {
    confetti({
      angle: randomInRange(55, 125),
      spread: randomInRange(50, 70),
      particleCount: randomInRange(50, 100),
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="flex gap-2 items-center justify-center mt-4">
      <Button variant="outline" onClick={handleBack}>
        Voltar para o produto
      </Button>
      <Button
        onClick={() =>
          confetti({
            angle: randomInRange(55, 125),
            spread: randomInRange(50, 70),
            particleCount: randomInRange(50, 100),
            origin: { y: 0.6 },
          })
        }
      >
        Show!
      </Button>
    </div>
  );
}
