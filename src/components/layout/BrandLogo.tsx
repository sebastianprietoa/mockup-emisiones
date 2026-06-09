import logoUrl from "../../assets/brand/gt-logo.png";

type BrandLogoProps = {
  className?: string;
};

export function BrandLogo({ className = "w-[144px]" }: BrandLogoProps) {
  return (
    <div className={`${className} overflow-hidden rounded-[22px] border border-[#5D4A73] bg-[#3A283A] shadow-soft`}>
      <img src={logoUrl} alt="Territorio Vivo" className="block h-auto w-full object-contain" />
    </div>
  );
}
