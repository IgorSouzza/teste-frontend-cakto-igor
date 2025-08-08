import { ReactNode } from "react";
import { cn } from "@/shared/lib/utils"; // utilitário opcional para concatenar classes

type TypographyProps = {
  children: ReactNode;
  className?: string;
};

export function TypographyH1({ children, className }: TypographyProps) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance",
        className
      )}
    >
      {children}
    </h1>
  );
}

export function TypographyH2({ children, className }: TypographyProps) {
  return (
    <h2
      className={cn(
        "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
    >
      {children}
    </h2>
  );
}

export function TypographyH3({ children, className }: TypographyProps) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h3>
  );
}

export function TypographyParagraph({ children, className }: TypographyProps) {
  return (
    <p className={cn("leading-7", className)}>
      {children}
    </p>
  );
}
