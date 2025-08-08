import Image from "next/image";

export function Header() {
  return (
    <div className="size-24 h-auto mt-4 mb-8">
      <Image
        src="https://framerusercontent.com/images/AuIrdJlSmtHpzTGjffzr90nOA0.png"
        alt="Cakto logo"
        width={396}
        height={96}
      />
    </div>
  );
}
