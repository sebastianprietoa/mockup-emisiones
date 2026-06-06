import logoUrl from "../../assets/brand/gt-logo.png";

type BrandLogoProps = {
  className?: string;
};

export function BrandLogo({ className = "h-12 w-auto" }: BrandLogoProps) {
  return (
    <img
      src={logoUrl}
      alt="Territorio Vivo"
      className={`${className} rounded-[18px] border border-[#D7CCC1] bg-[#EBE6DB] object-contain p-1 shadow-soft`}
    />
  );
}
