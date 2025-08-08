"use client";

import { CircleUser } from "lucide-react";

import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

export function ProductForm() {
  return (
    <div className="mt-8">
      <div className="flex items-center gap-2">
        <CircleUser />
        <h4 className="text-lg font-semibold">Seus dados</h4>
      </div>
      <form className="mt-4 space-y-4">
        <Label htmlFor="email" className="mb-2">
          E-mail
        </Label>
        <Input type="email" id="email" placeholder="Preencha seu E-mail" />
        <Label htmlFor="taxId" className="mb-2">
          CPF
        </Label>
        <Input type="number" id="taxId" placeholder="Preencha seu CPF" />
      </form>
    </div>
  );
}
